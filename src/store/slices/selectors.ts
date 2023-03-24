import { RootState } from "../";
import { IBoard } from "./types";
export const BoardsSelector = (state: RootState) => state.boards;
export const BoardItemSelector = (id: string) => (state: RootState) =>
	state.boards.boards.find((obj:IBoard) => obj.id === id);
