
import { AppDispatch, store } from "@/store";
import { IColumn } from "@/store/slices/types";
import supabase from "../supabaseClient";
import { fetchcolumns } from "@/store/slices/columnsSlice";
import { log } from "console";


export const subscribeToColumnsChanges = (project_id:string) => {
	const columns = supabase
		.channel("custom-all-channel")
		.on(
			"postgres_changes",
			{ event: "*", schema: "public", table: "columns" },
			async(payload) => {
				const dispatch: AppDispatch = store.dispatch;
				console.log(columns);
				
				await dispatch(fetchcolumns(project_id));
			}
		)
		

		.subscribe();
		return columns;
}
