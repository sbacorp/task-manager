import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITask, TasksState } from "./types";
import supabase from "@/lib/supabaseClient";
import { AppThunk } from "..";

const initialState: TasksState = {
	tasks: {},
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setTasks(
			state,
			action: PayloadAction<{ columnId: number; tasks: ITask[] }>
		) {
			const { columnId, tasks } = action.payload;
			state.tasks[columnId] = tasks;
		},
	},
});

export const { setTasks } = tasksSlice.actions;

export const fetchTasks =
	(column_id: string): AppThunk =>
	async (dispatch) => {
		const { data, error } = await supabase
			.from("tasks")
			.select("*")
			.eq("column_id", column_id)
			.order("position");
		await dispatch(
			setTasks({ columnId: Number(column_id), tasks: data as ITask[] })
		);
		if (error) {
			throw error;
		}
	};

export const addTask =
	(task: Omit<ITask, "id">): AppThunk =>
	async (dispatch) => {
		const { error } = await supabase.from("tasks").insert(task).single();
		if (error) {
			throw error;
		}
		if (task.column_id) dispatch(fetchTasks(task.column_id));
	};
type IUpdateTask = Pick<ITask, "id" | "column_id" | "position">;

export const updateTask =
	(task: IUpdateTask): AppThunk =>
	async () => {
		const { error } = await supabase
			.from("tasks")
			.update({
				column_id: task.column_id,
				position: task.position,
			})
			.eq("id", task.id)
			.single();
		if (error) {
			throw error;
		}
	};


export const updateTaskInfo =
	(task: ITask): AppThunk =>
	async () => {
		const { error } = await supabase
			.from("tasks")
			.update(task)
			.eq("id", task.id)
			.single();
		if (error) {
			throw error;
		}
	};

export default tasksSlice.reducer;
