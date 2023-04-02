import { AppDispatch, store } from "@/store";
import supabase from "../supabaseClient";
import { fetchTasks } from "@/store/slices/tasksSlice";

export const subscribeToTasksChanges = (columnId: string) => {
	const tasks = supabase
		.channel("custom-tasks-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "tasks" },
			async (payload) => {
				const dispatch: AppDispatch = store.dispatch;
				
				await dispatch(fetchTasks(columnId));
			}
		)

		.subscribe();
};
