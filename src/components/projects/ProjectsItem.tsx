import { useAppDispatch, useAppSelector } from "@/store";
import { deleteProject } from "@/store/slices/projectSlice";
import { fetchProjects } from "@/store/slices/projectsSlice";
import { IProject } from "@/store/slices/types";
import Link from "next/link";
import React from "react";
import EditProjectItem from "./EditProjectItem";

function ProjectsItem({ project }: { project: IProject }) {
	const dispatch = useAppDispatch();
	const deleteProjectFn =async()=>{
		await dispatch(deleteProject(project.id));
		await dispatch(fetchProjects({ profileId: project.profile_id, searchValue:''}));
	}
	return (
		<div
			className={`flex flex-col gap items-center text-center relative justify-start w-64 h-72 py-10 px-3 border-dark6 border border-double rounded-xl gap-4 bg-${project.color}`}
		>
			<svg
				onClick={deleteProjectFn}
				fill="#868E96"
				className="absolute right-4 top-4 cursor-pointer"
				viewBox="0 0 24 24"
				height="20"
				width="20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
			</svg>
			<p className="text-xl font-semibold capitalize">{project.title}</p>
			<p className="text-base text-dark2">{project.desc?project.desc:'нет описания'}</p>
			<div className="buttons flex flex-col justify-self-end gap-2 pt-4">
				<Link
					href={`/projects/${project.id}`}
					className="text-base rounded px-4 py-2 bg-dark6 hover:bg-dark4 transition-all duration-300"
				>
					Открыть
				</Link>
				<EditProjectItem project={project}/>
			</div>
		</div>
	);
}

export default ProjectsItem;
