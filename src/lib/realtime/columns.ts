
import { AppDispatch, store } from "@/store";
import supabase from "../supabaseClient";
import { fetchcolumns } from "@/store/slices/columnsSlice";


export const subscribeToColumnsChanges = (project_id:string) => {
	const columns = supabase
		.channel("custom-all-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "columns" },
			async(payload) => {
				const dispatch: AppDispatch = store.dispatch;
				await dispatch(fetchcolumns(project_id));
			}
		)
		

		.subscribe();
		return columns;
}
