import { useAppDispatch, useAppSelector } from "@/store";
import { IColumn, Status } from "@/store/slices/types";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Editable from "./Editable";
import { addTask, fetchTasks } from "@/store/slices/tasksSlice";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { log } from "console";
import { deleteColumn, fetchcolumns } from "@/store/slices/columnsSlice";

function Column({ column }: { column: IColumn }) {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true)
	const tasks = useAppSelector(
		(state) => state.tasksReducer.tasks[Number(column.id)]
	);
	
	const status = useAppSelector(state=>state.columnsReducer.status);
	const [loader, setLoader] = useState(status)
	const deleteColumnFn =async()=>{
		console.log(status);
		await dispatch(deleteColumn(column.id));
		console.log(status);
		await dispatch(fetchcolumns(column.project_id));
	}
	const editTitleFn = () => {
		dispatch(fetchTasks(column.id));
	};
	useEffect(() => {
		dispatch(fetchTasks(column.id));
		console.log(tasks);
		setLoading(false)
	}, [column.id, dispatch]);
	const createTaskFn = async(title: string) => {
		if (column) {
			await dispatch(addTask({ column_id: column.id, title: title, position:1 }));
			
		}
	};
	if(loading) return <>loading...</>
	return (
		<div className="bg-dark8 flex-shrink-0 h-fit min-h-[100px] max-h-[500px] rounded-lg border relative border-solid border-dark6 p-5 w-72 overflow-hidden">
			{/* {status == Status.LOADING && <>ADADADADADA</>} */}
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
