import { RootState } from "../";
export const BoardsSelector = (state: RootState) => state.boards;
export const BoardItemSelector = (id: string) => (state: RootState) =>
	state.boards.boards.find((obj) => obj.id === id);
