import supabase from "@/lib/supabaseClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject, IProjectSliceState, Status } from "./types";

const initialState: IProjectSliceState = {
	status: Status.LOADING,
};

export const deleteProject = createAsyncThunk<void, string>(
	"project/delete",
	async (projectId) => {
		try {
			await supabase.from("projects").delete().eq("id", projectId);
			return;
		} catch (error) {
			console.log(error);
		}
	}
);
export const ProjectSlice = createSlice({
	name: "ProjectSlice",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(deleteProject.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(deleteProject.fulfilled, (state) => {
			state.status = Status.SUCCESS;
		});
		builder.addCase(deleteProject.rejected, (state) => {
			state.status = Status.ERROR;
		});
	},
});

export default ProjectSlice.reducer;
