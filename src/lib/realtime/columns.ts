import {AppDispatch, store} from "@/store";
import supabase from "../supabaseClient";
import {fetchcolumns} from "@/store/slices/columnsSlice";


export const subscribeToColumnsChanges = (project_id: string) => {
    return supabase
        .channel("realtime cols")
        .on(
            "postgres_changes",
            {event: "*", schema: "public", table: "columns"},
            async () => {
                const dispatch: AppDispatch = store.dispatch;
                await dispatch(fetchcolumns(project_id));
            }
        )


        .subscribe();
}
