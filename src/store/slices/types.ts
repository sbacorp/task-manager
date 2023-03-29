export interface ITask {
	id: string;
	title: string;
	description?: string;
	columnId?: string;
}

export interface IColumn {
	id: string;
	title: string;
	description?: string;
	tasks: ITask[];
	projectId: string;
}
export interface IProject {
	id: string;
	profile_id: string;
	title: string;
	desc?: string;
	color?: string;
}

export interface IProjectsSliceState {
	projects: IProject[];
	status: Status;
}
export interface IProjectSliceState {
	status: Status;
}
export enum Status {
	LOADING = "loading",
	SUCCESS = "completed",
	ERROR = "error",
}
export interface IParams {
	profileId: string;
	searchValue?: string;
}
export interface IDeleteParams {
	id: string;
}