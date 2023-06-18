import { useAppDispatch, useAppSelector } from "@/store";
import { IColumn, Status } from "@/store/slices/types";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Editable from "../../../Editable";
import { addTask, fetchTasks } from "@/store/slices/tasksSlice";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";
import {
	deleteColumn,
	editColTitleLocal,
	editTitle,
	fetchcolumns,
} from "@/store/slices/columnsSlice";
import LoadingSpinner from "../../../ui/Loader";
import supabase from "@/lib/supabaseClient";

const Column = React.memo(function Column({ column }: { column: IColumn }) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);
	const tasks = useAppSelector(
		(state) => state.tasksReducer.tasks[Number(column.id)]
	);
	useEffect(() => {
		const channel = supabase
			.channel(`reatime tasks ${column.id}`)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "tasks",
				},
				(payload) => {
					dispatch(fetchTasks(column.id));
				}
			)
			.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [supabase]);
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
	}, [column.id]);
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
		<div className="bg-dark8 flex-shrink-0 h-fit min-h-[100px] rounded-lg border relative border-solid border-dark6 p-5 w-72 md:w-80 overflow-hidden">
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
			<div className="flex-col rounded-lg min-h-[20px] max-h-fit overflow-hidden scroll">
				<Droppable
					direction="vertical"
					droppableId={String(column.id)}
					type="task"
				>
					{(provided) => (
						<div
							className="min-h-[20px]"
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
			</div>
			<Editable
				onSave={createTaskFn}
				classes="bg-dark8 text-lg"
				text=""
				defaultValue="Add task"
			/>
		</div>
	);
});

export default Column;
