import { AppDispatch, store } from "@/store";
import supabase from "../supabaseClient";
import { fetchTasks } from "@/store/slices/tasksSlice";
import { IColumn } from "@/store/slices/types";

export const subscribeToTasksChanges = (columns: IColumn[]) => {
	const tasks = supabase
		.channel("custom-tasks-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			async (payload) => {
				const dispatch: AppDispatch = store.dispatch;
				if (columns.length) {
					columns.forEach((element) => {
						dispatch(fetchTasks(element.id));
					});
				}
			}
		)
		.subscribe();
};
