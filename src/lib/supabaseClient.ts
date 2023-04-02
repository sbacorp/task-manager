import { AppDispatch, store, useAppDispatch } from "@/store";
import { fetchTasks } from "@/store/slices/tasksSlice";
import { IColumn } from "@/store/slices/types";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const storage = supabase.storage;



export default supabase;
