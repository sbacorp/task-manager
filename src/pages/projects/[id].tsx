import Column from "@/components/Column";
import CreateColumn from "@/components/createColumn";
import PyramidLoader from "@/components/ui/PyramidLoader";
import { useAppDispatch, useAppSelector } from "@/store";
import { addColumn, fetchcolumns } from "@/store/slices/columnsSlice";
import { fetchTasks, setTasks, updateTask } from "@/store/slices/tasksSlice";
import { IColumn, ITask, TaskUpdatePayload } from "@/store/slices/types";
import { log } from "console";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
function Project() {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const projects = useAppSelector((state) => state.projectsSlice.projects);
	const project = projects.find((b) => b.id == id);
	const [loading, setLoading] = useState(true);
	let columns = useAppSelector((state) => state.columnsReducer.columns);
	const tasks = useAppSelector((state) => state.tasksReducer.tasks);

	const handleDragEnd = (result: any) => {
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
			dispatch(
				updateTask({
					id: draggableId,
					column_id: destination.droppableId,
					position: destination.index,
				})
			);
			
			dispatch(fetchcolumns(String(id))).then(() => {
				columns.forEach((column: IColumn) => {
					dispatch(fetchTasks(column.id));
				});
			});
		} else if (type === "column") {
			
		}
	};



	useEffect(() => {
		const getColumns = async () => {
			await dispatch(fetchcolumns(project!.id));
			setLoading(false);
		};

		if (project) {
			getColumns();
			console.log(tasks, "aadada");
		}
	}, [project]);
	const createColumnFn = async (title: string) => {
		if (project) {
			await dispatch(addColumn({ project_id: project.id, title: title }));
			await dispatch(fetchcolumns(project.id));
		}
	};
	if (loading) return <PyramidLoader />;
	if (!project) {
		router.push("/projects");
		return alert("Проект не найден");
	}
	return (
		<div className="container h-[70vh] overflow-hidden flex flex-col items-start justify-start">
			<div className="text-3xl text-white ">{project.title}</div>
			<div className="columns scroll h-full w-full flex gap-9 overflow-x-scroll">
				<DragDropContext onDragEnd={handleDragEnd}>
					{columns &&
						columns.map((el: IColumn) => <Column column={el} key={el.id} />)}
				</DragDropContext>
				<CreateColumn createColumnF={createColumnFn} />
			</div>
		</div>
	);
}

export default Project;
