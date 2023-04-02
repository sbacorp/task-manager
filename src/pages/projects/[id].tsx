import Column from "@/components/projects/project/column";
import CreateColumn from "@/components/projects/project/column/createColumn";
import PyramidLoader from "@/components/ui/PyramidLoader";
import { subscribeToColumnsChanges } from "@/lib/realtime/columns";
import { subscribeToTasksChanges } from "@/lib/realtime/tasks";
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

	// 	destinationIndex: number,
	// 	destinationColumnId: string,
	// 	taskId: string
	// ) => {
	// 	const tasksFromColumn = tasks[Number(destinationColumnId)];
	// 	const sortedTasks = tasksFromColumn.sort((a, b) => a.position - b.position);
	// 	let position =
	// 		destinationIndex === 0
	// 			? 0
	// 			: sortedTasks[destinationIndex - 1].position + 1;

	// 	const patchTask = {
	// 		_id: taskId,
	// 		position,
	// 		columnId: destinationColumnId,
	// 	};
	// };
	useEffect(() => {
		const getColumns = async () => {
			await dispatch(fetchcolumns(project!.id));
			if (tasks) setLoading(false);
		};
		if (project) {
			getColumns();
			subscribeToColumnsChanges(project!.id);
		}
		if(columns.length){
			subscribeToTasksChanges(columns);
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
			<div className=" text-lg md:text-4xl text-white font-semibold mb-10">{project.title}</div>
			<div className="columns scroll h-full w-full flex gap-9 overflow-x-scroll">
				<DragDropContext
					// onDragEnd={handleDragEnd}
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
