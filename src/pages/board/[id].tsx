import { useAppSelector } from "@/store";
import { useRouter } from "next/router";

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
