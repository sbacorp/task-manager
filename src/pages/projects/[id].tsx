import Column from "@/components/projects/project/column";
import CreateColumn from "@/components/projects/project/column/createColumn";
import PyramidLoader from "@/components/ui/PyramidLoader";
import { subscribeToColumnsChanges } from "@/lib/realtime/columns";
import supabase from "@/lib/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/store";
import { addColumn, fetchcolumns } from "@/store/slices/columns";
import { setTasks, updateTask } from "@/store/slices/tasks";
import { IColumn } from "@/store/slices/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

function Project() {
	const router = useRouter(),
		{ id } = router.query,
		dispatch = useAppDispatch(),
		projects = useAppSelector((state) => {
			return state.projectsSlice.projects;
		}),
		project = projects.find((b) => b.id == id),
		[loading, setLoading] = useState(true);

	let columns = useAppSelector((state) => state.columnsReducer.columns);
	const tasks = useAppSelector((state) => state.tasksReducer.tasks);
	const currentTasksState = useAppSelector((state) => state.tasksReducer.tasks);

	const handleDragEnd = (currentTasksState: any, result: any) => {
		const { source, destination, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		)
			return;
		if (type === "task") {
			const newTasksState = JSON.parse(JSON.stringify(currentTasksState));
			const removedTask = newTasksState[source.droppableId].splice(
				source.index,
				1
			)[0];
			newTasksState[destination.droppableId].splice(
				destination.index,
				0,
				removedTask
			);
			dispatch(
				setTasks({
					columnId: source.droppableId,
					tasks: newTasksState[source.droppableId],
				})
			);
			// Обновляем стейт задач
			dispatch(
				setTasks({
					columnId: destination.droppableId,
					tasks: newTasksState[destination.droppableId],
				})
			);
			dispatch(
				updateTask({
					id: draggableId,
					column_id: destination.droppableId,
					position: destination.index,
				})
			);
		} else if (type === "column") {
		}
	};

	useEffect(() => {
		const getColumns = async () => {
			await dispatch(fetchcolumns(project!.id));
			if (tasks) setLoading(false);
		};
		console.log("effect");
		if (project) {
			getColumns();
			getAvatars();
			subscribeToColumnsChanges(project!.id);
		}
	}, [project]);
	const createColumnFn = async (title: string) => {
		if (project) {
			await dispatch(addColumn({ project_id: project.id, title: title }));
			await dispatch(fetchcolumns(project.id));
		}
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
				console.log(avatars);
			}
			if (error) console.log(error);
		}
	};

	if (loading) return <PyramidLoader />;
	if (!project) {
		router.push("/projects");
		return alert("Проект не найден");
	}
	return (
		<div className="w-[95vw] h-[70vh] overflow-hidden flex flex-col items-start justify-start">
			<div className="top flex justify-between w-full">
				<div className=" text-lg md:text-4xl text-white font-semibold mb-10">
					{project.title}
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
					onDragEnd={(result) => handleDragEnd(currentTasksState, result)}
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
