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
	title: string;
	columns: IColumn[];
}

export interface IBoardsSliceState {
	boards: IBoard[];
}


