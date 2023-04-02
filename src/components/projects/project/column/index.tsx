import { useAppDispatch, useAppSelector } from "@/store";
import { IColumn, Status } from "@/store/slices/types";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Editable from "../../../Editable";
import { addTask, fetchTasks } from "@/store/slices/tasksSlice";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import { log } from "console";
import {
	deleteColumn,
	editColTitleLocal,
	editTitle,
	fetchcolumns,
} from "@/store/slices/columnsSlice";
import LoadingSpinner from "../../../ui/Loader";
import PyramidLoader from "../../../ui/PyramidLoader";
import { subscribeToTasksChanges } from "@/lib/realtime/tasks";

function Column({ column }: { column: IColumn }) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);
	const tasks = useAppSelector(
		(state) => state.tasksReducer.tasks[Number(column.id)]
	);
	const status = useAppSelector((state) => state.columnsReducer.status);
	const deleteColumnFn = async () => {
		await dispatch(deleteColumn(column.id));
		await dispatch(fetchcolumns(column.project_id));
	};
	const editTitleFn = (title: string) => {
		dispatch(editColTitleLocal({ columnId: Number(column.id), title: title }));
		dispatch(editTitle({ columnId: Number(column.id), title: title }));
	};
	useEffect(() => {
		dispatch(fetchTasks(column.id));
		setLoading(false);
	}, [column.id, dispatch]);
	const createTaskFn = (title: string) => {
		if (column) {
			dispatch(
				addTask({
					column_id: column.id,
					title: title,
					position: tasks.length ? tasks.length + 1 : 0,
				})
			);
		}
	};
	if (loading) return <LoadingSpinner classes="" />;
	return (
		<div className="bg-dark8 flex-shrink-0 h-fit min-h-[100px] max-h-[500px] rounded-lg border relative border-solid border-dark6 p-5 w-72 overflow-hidden">
			{status == Status.LOADING && (
				<LoadingSpinner classes="absolute  right-1 bottom-1" />
			)}
			<Cross2Icon
				className=" absolute right-3 top-3 w-6 h-6 cursor-pointer"
				onClick={() => deleteColumnFn()}
			/>

			<Editable
				text={column.title}
				onSave={editTitleFn}
				classes="bg-dark8 text-lg md:text-xl font-semibold "
			/>
			<Droppable droppableId={String(column.id)} type="task">
				{(provided) => (
					<div
						className="flex-col p-2 rounded-lg"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{tasks &&
							tasks.map((task, index) => (
								<Task key={task.id} task={task} index={index} />
							))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Editable
				onSave={createTaskFn}
				classes="bg-dark8 text-lg"
				text=""
				defaultValue="Добавить задачу"
			/>
		</div>
	);
}

export default Column;
