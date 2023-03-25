import AddProject from "@/components/AddProject";
import ProjectsItem from "@/components/ProjectsItem";
import Search from "@/components/Search";
import React from "react";
import {  useAppSelector } from '@/store';

function Projects() {
	const boards  = useAppSelector(state=>state.boardsSlice.boards);
	return (
		<div className="flex flex-col gap-20 items-center justify-start w-full container pt-20">
			<div className="head flex w-full justify-between">
				<p className="font-bold text-4xl">Projects (7)</p>
				<Search />
			</div>
			<div className="flex gap-5 w-full items-start justify-start">
				{boards && boards.map((el) => <ProjectsItem board={el} key={el.id}/>)}
				<AddProject />
			</div>
		</div>
	);
}

export default Projects;
