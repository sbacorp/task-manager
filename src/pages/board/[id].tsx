import { useAppSelector } from "@/store";
import { IBoard, IBoardsSliceState } from "@/store/slices/types";
import { useRouter } from "next/router";
import React from "react";

function Board() {
	const router = useRouter();
	const { id } = router.query;
	const boards = useAppSelector((state) => state.boardsSlice.boards);
	const board = boards.find((b) => b.id === id);
  if (!board) {
    return alert('Проект не найден')
  }
	return (
		<div>
			<p>{board.title}</p>
		</div>
	);
}

export default Board;
