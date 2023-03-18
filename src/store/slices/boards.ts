import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard, IBoardsSliceState, IColumn, ITask } from "./types";

const initialState: IBoardsSliceState = {
	boards: [],
};

export const BoardsSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		addBoard(state, action: PayloadAction<IBoard>) {
			state.boards.push({
				...action.payload,
			});
		},
		deleteBoard(state, action: PayloadAction<IBoard>) {
			state.boards = state.boards.filter(
				(state) => !(state.id === action.payload.id)
			);
		},
		updateBoards: (state, action) => {
			state.boards = action.payload;
		},
		updateTitle: (state, action) => {
			const find = state.boards.find(
				(boards) => boards.id === action.payload.id
			);
			if (find) {
				find.title = action.payload.value;
			}
		},
		updateGoal: (state, action) => {
			const find = state.boards.find(
				(boards) => boards.id === action.payload.id
			);
			if (find) {
				find.goal = action.payload.value;
			}
		},
		addColumn(state, action: PayloadAction<IColumn>) {
			const board = state.boards.find(
				(board) => board.id === action.payload.boardId
			);
			if (board) {
				board.columns.push({
					...action.payload,
				});
			}
		},
		addTask(state, action: PayloadAction<IColumn>) {
			const board = state.boards.find(
				(board) => board.id === action.payload.boardId
			);
			if (board) {
			}
		},

		moveItem: (state, action) => {
			const board = state.boards.find(
				(board) => board.id === action.payload.id
			);
			if (board) {
				const { taskId, fromColumnId, toColumnId } = action.payload;
				const fromColumn = board.columns.find((col) => col.id === fromColumnId);
				const toColumn = board.columns.find((col) => col.id === toColumnId);
				if (fromColumn && toColumn) {
					const taskIndex = fromColumn.tasks.findIndex(
						(task) => task.id === taskId
					);
					if (taskIndex !== -1) {
						const [task] = fromColumn.tasks.splice(taskIndex, 1);
						toColumn.tasks.push(task);
					}
				}
			}
		},
	},
});

export const {
	addBoard,
	deleteBoard,
	updateBoards,
	updateTitle,
	updateGoal,
	moveItem,
	addColumn,
} = BoardsSlice.actions;

export default BoardsSlice.reducer;
