import supabase from "@/lib/supabaseClient";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IBoard, IBoardsSliceState, IParams, Status } from "./types";

const initialState: IBoardsSliceState = {
	boards: [],
	status: Status.LOADING,
};
export const fetchBoards = createAsyncThunk<IBoard[], IParams>(
	"boardsSlice/fetchBoardsStatus",
	async (params) => {
		const { profileId, searchValue } = params;
		const { data, error } = await supabase
			.from("boards")
			.select("*")
			.eq("profile_id", profileId)
			.ilike("title", `%${searchValue}%`);
		if (error) console.error("Error fetching boards:", error);
		if (!data?.length) {
			return [];
		} else {
			const boards: IBoard[] = data as IBoard[];
			console.log("Boards for profile:", boards);
			return boards;
		}
	}
);

export const addBoard = createAsyncThunk<IBoard, IBoard>(
	"boards/addBoard",
	async (newBoard) => {
		const { data, error } = await supabase.from("boards").insert([newBoard]);
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

export const BoardsSlice = createSlice({
	name: "boardsSlice",
	initialState,
	reducers: {
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
		// addColumn(state, action: PayloadAction<IColumn>) {
		// 	const board = state.boards.find(
		// 		(board) => board.id === action.payload.boardId
		// 	);
		// 	if (board) {
		// 		board.columns.push({
		// 			...action.payload,
		// 		});
		// 	}
		// },
		// addTask(state, action: PayloadAction<IColumn>) {
		// 	const board = state.boards.find(
		// 		(board) => board.id === action.payload.boardId
		// 	);
		// 	if (board) {
		// 	}
		// },

		// moveItem: (state, action) => {
		// 	const board = state.boards.find(
		// 		(board) => board.id === action.payload.id
		// 	);
		// 	if (board) {
		// 		const { taskId, fromColumnId, toColumnId } = action.payload;
		// 		const fromColumn = board.columns.find((col) => col.id === fromColumnId);
		// 		const toColumn = board.columns.find((col) => col.id === toColumnId);
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
		builder.addCase(fetchBoards.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchBoards.fulfilled, (state, action) => {
			state.boards = action.payload;

			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchBoards.rejected, (state) => {
			state.status = Status.ERROR;
			state.boards = [];
		});
		builder.addCase(addBoard.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(
			addBoard.fulfilled,
			(state, action: PayloadAction<IBoard>) => {
				state.status = Status.SUCCESS;
				state.boards.push(action.payload);
			}
		);
		builder.addCase(addBoard.rejected, (state) => {
			state.status = Status.ERROR;
		});
	},
});

export const { deleteBoard, updateBoards, updateTitle } = BoardsSlice.actions;

export default BoardsSlice.reducer;
