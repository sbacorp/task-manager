import { rootReducer, useAppSelector } from "@/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { fetchBoards } from "@/store/slices/boardsSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

function Project() {
	const router = useRouter();
	const { id } = router.query;
	const projects = useAppSelector((state) => state.projectsSlice.projects);
	const project = projects.find((b) => b.id === id);
	if (!project) {
		return alert("Проект не найден");
	}
	return (
		<div>
			<p>{project.title}</p>
		</div>
	);
}

export default Project;
