import supabase from "@/lib/supabaseClient";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IColumn, Status } from "./types";
import { AppDispatch } from "..";

interface IColumnsSlice {
	columns: IColumn[];
	status: Status;
}
const initialState: IColumnsSlice = {
	columns: [],
	status: Status.LOADING,
};

export const fetchcolumns = createAsyncThunk<IColumn[], string>(
	"columnsSlice/fetchcolumnsStatus",
	async (project_id) => {
		const { data, error } = await supabase
			.from("columns")
			.select("*")
			.eq("project_id", project_id);
		if (error) console.error("Error fetching projects:", error);
		if (!data?.length) {
			return [];
		} else {
			const columns: IColumn[] = data as IColumn[];
			return columns;
		}
	}
);
interface IAddParams {
	project_id: string;
	title: string;
}
export const addColumn = createAsyncThunk<IColumn[], IAddParams>(
	"columnsSlice/addColumnStatus",
	async (params) => {
		const { project_id, title } = params;
		const { data, error } = await supabase
			.from("columns")
			.insert([{ title: title, project_id: project_id }]);

		if (error) {
			console.log(error);
		}
		if (!data || !data[0]) {
			console.warn("Данные не получены или имеют значение null");
			throw new Error("Не удалось получить данные после добавления колонки");
		}
		return data[0];
	}
);
interface IEditParams {
	title: string;
	columnId: number;
}
export const editTitle = createAsyncThunk<IColumn[], IEditParams>(
	"columnsSlice/addColumnStatus",
	async (params) => {
		const { title, columnId } = params;
		const { data, error } = await supabase
			.from("columns")
			.update([{ title: title }])
			.eq("id", columnId);

		if (error) {
			console.log(error);
		}
		if (!data || !data[0]) {
			console.warn("Данные не получены или имеют значение null");
			throw new Error("Не удалось получить данные после добавления колонки");
		}
		return data[0];
	}
);

export const deleteColumn = createAsyncThunk<void, string>(
	"column/delete",
	async (column_id) => {
		try {
			await supabase.from("columns").delete().eq("id", column_id);
			return;
		} catch (error) {
			console.log(error);
		}
	}
);

const columnsSlice = createSlice({
	name: "columnsSlice",
	initialState,
	reducers: {
		editColTitleLocal(
			state,
			action: PayloadAction<{ columnId: number, title:string }>
		) {
			const { columnId, title } = action.payload;
			const column = state.columns.find((column) => Number(column.id) === columnId);
			if (column) {
				column.title = title;
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchcolumns.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchcolumns.fulfilled, (state, action) => {
			state.columns = action.payload;

			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchcolumns.rejected, (state) => {
			state.status = Status.ERROR;
			state.columns = [];
		});
		builder.addCase(deleteColumn.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(deleteColumn.fulfilled, (state, action) => {
			state.status = Status.SUCCESS;
		});
		builder.addCase(deleteColumn.rejected, (state) => {
			state.status = Status.ERROR;
		});
	},
});

export const { editColTitleLocal } = columnsSlice.actions;

export default columnsSlice.reducer;
