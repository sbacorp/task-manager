"use client";
import AddProject from "@/components/projects/AddProject";
import ProjectsItem from "@/components/projects/ProjectsItem";
import Search from "@/components/Search";
import React, { useEffect, useState } from "react";
import { store, useAppDispatch, useAppSelector } from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";
import PrivateRoute from "@/components/privateRoute";
import supabase from "@/lib/supabaseClient";
import PyramidLoader from "@/components/ui/PyramidLoader";
function Projects() {
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);
	const { projects, status } = useAppSelector((state) => state.projectsSlice);
	const getProjects = async () => {
		try {
			const { data } = await supabase.auth.getUser();
			await dispatch(fetchProjects({ profileId: data!.user!.id, searchValue }));
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getProjects();
	}, [searchValue, dispatch]);

	if (loading) {
		return <PyramidLoader/>
	} else {
		return (
			<PrivateRoute>
				<div className="flex flex-col gap-20 items-center justify-start w-full container pt-20">
					<div className="head flex w-full justify-between">
						<p className="font-bold text-4xl">Projects (7)</p>
						<Search value={searchValue} setValue={setSearchValue} />
					</div>
					<div className="flex gap-5 w-full items-start justify-start flex-wrap">
						{projects &&
							projects.map((el) => <ProjectsItem project={el} key={el.id} />)}
						<AddProject />
					</div>
				</div>
			</PrivateRoute>
		);
	}
}

export default Projects;
