import supabase from '@/lib/supabaseClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IColumn, Status } from './types';

interface IColumnsSlice {
	columns: IColumn[];
	status:Status;
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
			console.log("columns for project:", columns);
			return columns;
		}
	}
);

const columnsSlice = createSlice({
  name: 'columnsSlice',
  initialState,
  reducers: {

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
	}
});

export const {} = columnsSlice.actions

export default columnsSlice.reducer