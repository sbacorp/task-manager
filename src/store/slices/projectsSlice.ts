import supabase from "@/lib/supabaseClient";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject, IProjectsSliceState, IParams, Status } from "./types";

const initialState: IProjectsSliceState = {
	projects: [],
	status: Status.LOADING,
};
export const fetchProjects = createAsyncThunk<IProject[], IParams>(
	"projectsSlice/fetchProjectsStatus",
	async (params) => {
		const { profileId, searchValue } = params;
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.eq("profile_id", profileId)
			.ilike("title", `%${searchValue}%`);
		if (error) console.error("Error fetching projects:", error);
		if (!data?.length) {
			return [];
		} else {
			const projects: IProject[] = data as IProject[];
			console.log("Projects for profile:", projects);
			return projects;
		}
	}
);

export const addProject = createAsyncThunk<IProject, IProject>(
	"projects/addProject",
	async (newProject) => {
		const { data, error } = await supabase
			.from("projects")
			.insert([newProject]);
		if (error) {
			console.log(error);
		}
		if (!data || !data[0]) {
			console.warn("Данные не получены или имеют значение null");
			throw new Error("Не удалось получить данные после добавления доски");
		}
		return data[0];
	}
);

export const ProjectsSlice = createSlice({
	name: "projectsSlice",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProjects.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchProjects.fulfilled, (state, action) => {
			state.projects = action.payload;

			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchProjects.rejected, (state) => {
			state.status = Status.ERROR;
			state.projects = [];
		});
		builder.addCase(addProject.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(
			addProject.fulfilled,
			(state, action: PayloadAction<IProject>) => {
				state.status = Status.SUCCESS;
				state.projects.push(action.payload);
			}
		);
		builder.addCase(addProject.rejected, (state) => {
			state.status = Status.ERROR;
		});
	},
});


export default ProjectsSlice.reducer;
