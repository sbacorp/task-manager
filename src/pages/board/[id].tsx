import { rootReducer, useAppSelector } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { fetchBoards } from "@/store/slices/boardsSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

function Board() {
	const router = useRouter();
	const { id } = router.query;
	useEffect(() => {}, []);

	//   if (!board) {
	//     return alert('Проект не найден')
	//   }
	return (
			<div>{/* <p>{board.title}</p> */}</div>
	);
}

export default Board;
