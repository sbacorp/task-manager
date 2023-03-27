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
	boardId: string;
}
export interface IBoard {
	id: string;
	profile_id: string;
	title: string;
	desc?: string;
	color?: string;
}

export interface IBoardsSliceState {
	boards: IBoard[];
	status:Status
}
export enum Status {
	LOADING = "loading",
	SUCCESS = "completed",
	ERROR = "error",
}export interface IParams {
	profileId: string;
	searchValue: string;
}