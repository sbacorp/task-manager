import Column from "@/components/projects/project/column";
import CreateColumn from "@/components/projects/project/column/createColumn";
import PyramidLoader from "@/components/ui/PyramidLoader";
import { subscribeToColumnsChanges } from "@/lib/realtime/columns";
import supabase from "@/lib/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/store";
import { addColumn, fetchcolumns } from "@/store/slices/columnsSlice";
import { setTasks, updateTask } from "@/store/slices/tasksSlice";
import { IColumn, IProject, ITask, TasksState } from "@/store/slices/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { toast } from "react-toastify";

function Project({ id }: { id: string }) {
	const router = useRouter(),
		dispatch = useAppDispatch(),
		projects = useAppSelector((state) => {
			return state.projectsSlice.projects;
		}),
		project = projects.find((b) => b.id == id),
		[loading, setLoading] = useState(true);

	let columns = useAppSelector((state) => state.columnsReducer.columns);
	const currentTasksState: TasksState = useAppSelector(
		(state) => state.tasksReducer
	);
	const changeTasksStateHandler = ({
		columnId,
		tasks,
	}: {
		columnId: number;
		tasks: ITask[];
	}) => {
		dispatch(
			setTasks({
				columnId: columnId,
				tasks: tasks,
			})
		);
	};
	const handleDragEnd = (currentTasksState: TasksState, result: any) => {
		const { source, destination, type } = result;
		if (!destination) {
			return;
		}
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;
		if (type === "task") {
			const newTasksState = JSON.parse(JSON.stringify(currentTasksState.tasks));
			const removedTask = newTasksState[source.droppableId].splice(
				source.index,
				1
			)[0];
			newTasksState[destination.droppableId].splice(
				destination.index,
				0,
				removedTask
			);

			if (destination.droppableId === source.droppableId) {
				const sourceTasks: ITask[] = newTasksState[source.droppableId];
				changeTasksStateHandler({
					columnId: source.droppableId,
					tasks: sourceTasks,
				});
				for (let index = 0; index < sourceTasks.length; index++) {
					dispatch(
						updateTask({
							id: sourceTasks[index].id,
							column_id: destination.droppableId,
							position: index,
						})
					);
				}
			} else {
				const sourceTasks: ITask[] = newTasksState[source.droppableId];
				const destTasks: ITask[] = newTasksState[destination.droppableId];
				changeTasksStateHandler({
					columnId: source.droppableId,
					tasks: sourceTasks,
				});
				changeTasksStateHandler({
					columnId: destination.droppableId,
					tasks: destTasks,
				});
				for (let index = 0; index < destTasks.length; index++) {
					dispatch(
						updateTask({
							id: destTasks[index].id,
							column_id: destination.droppableId,
							position: index,
						})
					);
				}
				for (let index = 0; index < sourceTasks.length; index++) {
					dispatch(
						updateTask({
							id: sourceTasks[index].id,
							column_id: source.droppableId,
							position: index,
						})
					);
				}
			}
		}
	};

	useEffect(() => {
		if (project) {
			const getColumns = async () => {
				await dispatch(fetchcolumns(project?.id));
				setLoading(false);
			};
			getAvatars();
			subscribeToColumnsChanges(project?.id);
			getColumns();
		} else {
			toast.error("Project not found!");
			router.push("/projects");
		}
	}, [project]);
	const createColumnFn = async ({ title }: { title: string }) => {
		await dispatch(addColumn({ project_id: project!.id, title: title }));
		await dispatch(fetchcolumns(project!.id));
	};
	interface IAvatars {
		avatarPath: string;
	}

	const [avatars, setAvatars] = useState<IAvatars[]>([]);
	const getAvatars = async () => {
		if (project && project.users) {
			const { data, error } = await supabase
				.from("profiles")
				.select("avatarPath")
				.in("id", project.users);
			if (data) {
				setAvatars(data);
			}
			if (error) console.log(error);
		}
	};

	if (loading) return <PyramidLoader />;
	if (!project) return router.push("/projects");
	return (
		<div className="w-[95vw] h-[92vh] overflow-hidden flex flex-col items-start justify-start">
			<div className="top flex justify-between w-full">
				<div className=" text-lg md:text-4xl text-white font-semibold mb-10">
					{project!.title}
				</div>

				<div className="avatars flex ">
					{avatars &&
						avatars.map((el: any, i) => {
							return (
								<div
									key={i}
									className="relative w-10 h-10 rounded-[50%] overflow-hidden -ml-2"
								>
									<img
										data-tooltip-target="tooltip-default"
										className=" inset-0 w-full h-full object-cover object-center"
										src={`https://lifscnxzktzcffgkwvuw.supabase.co/storage/v1/object/public/user-avatars/${el.avatarPath}`}
										alt="avatar"
									/>
								</div>
							);
						})}
				</div>
			</div>
			<div className="h-full w-full flex gap-9 overflow-x-auto overflow-y-auto scroll">
				<DragDropContext
					onDragEnd={(result) => {
						handleDragEnd(currentTasksState, result);
					}}
				>
					{columns &&
						columns.map((el: IColumn) => <Column column={el} key={el.id} />)}
				</DragDropContext>
				<CreateColumn createColumnF={createColumnFn} />
			</div>
		</div>
	);
}

export default Project;
interface MyContext {
	query: {
		id: string;
	};
}
export const getServerSideProps = async (context: MyContext) => {
	const { id } = context.query;
	return {
		props: {
			id,
		},
	};
};
