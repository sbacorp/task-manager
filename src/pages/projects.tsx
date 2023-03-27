"use client";
import AddProject from "@/components/AddProject";
import ProjectsItem from "@/components/ProjectsItem";
import Search from "@/components/Search";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchBoards } from "@/store/slices/boardsSlice";
import PrivateRoute from "@/components/privateRoute";
import supabase from "@/lib/supabaseClient";


function Projects() {
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);
	const { boards, status } = useAppSelector((state) => state.boardsSlice);
	const getBoards = async () => {
		try {
			const { data } = await supabase.auth.getUser();
			await dispatch(fetchBoards({ profileId: data!.user!.id, searchValue }));
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBoards();
	}, [searchValue, dispatch]);

	if (loading) {
		return <>loading</>;
	} else {
		return (
			<PrivateRoute>
				<div className="flex flex-col gap-20 items-center justify-start w-full container pt-20">
					<div className="head flex w-full justify-between">
						<p className="font-bold text-4xl">Projects (7)</p>
						<Search value={searchValue} setValue={setSearchValue} />
					</div>
					<div className="flex gap-5 w-full items-start justify-start flex-wrap">
						{boards&&boards.map((el) => (
							<ProjectsItem board={el} key={el.id} />
						))}
						<AddProject />
					</div>
				</div>
			</PrivateRoute>
		);
	}
}

export default Projects;
