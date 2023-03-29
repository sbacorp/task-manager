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
			 await supabase
			.from("projects")
			.delete()
			.eq("id", projectId);
			return;
		} catch (error) {
			console.log(error);
			
		}
		
		
	}
);
export const updateBoard = createAsyncThunk<IProject, string>(
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
		// addColumn(state, action: PayloadAction<IColumn>) {
		// 	const project = state.projects.find(
		// 		(project) => project.id === action.payload.projectId
		// 	);
		// 	if (project) {
		// 		project.columns.push({
		// 			...action.payload,
		// 		});
		// 	}
		// },
		// addTask(state, action: PayloadAction<IColumn>) {
		// 	const project = state.projects.find(
		// 		(project) => project.id === action.payload.projectId
		// 	);
		// 	if (project) {
		// 	}
		// },
		// moveItem: (state, action) => {
		// 	const project = state.projects.find(
		// 		(project) => project.id === action.payload.id
		// 	);
		// 	if (project) {
		// 		const { taskId, fromColumnId, toColumnId } = action.payload;
		// 		const fromColumn = project.columns.find((col) => col.id === fromColumnId);
		// 		const toColumn = project.columns.find((col) => col.id === toColumnId);
		// 		if (fromColumn && toColumn) {
		// 			const taskIndex = fromColumn.tasks.findIndex(
		// 				(task) => task.id === taskId
		// 			);
		// 			if (taskIndex !== -1) {
		// 				const [task] = fromColumn.tasks.splice(taskIndex, 1);
		// 				toColumn.tasks.push(task);
		// 			}
		// 		}
		// 	}
		// },
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
