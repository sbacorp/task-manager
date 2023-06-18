import AddProject from "@/components/projects/AddProject";
import ProjectsItem from "@/components/projects/ProjectsItem";
import Search from "@/components/Search";
import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";
import PrivateRoute from "@/components/privateRoute";
import supabase from "@/lib/supabaseClient";
import PyramidLoader from "@/components/ui/PyramidLoader";
import { debounce } from "lodash";

function Projects() {
	const [searchValue, setSearchValue] = useState("");
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);
	const { projects } = useAppSelector((state) => state.projectsSlice);
	const getProjects = useCallback(
		debounce(async () => {
			try {
				const { data } = await supabase.auth.getUser();
				await dispatch(
					fetchProjects({ profileId: data!.user!.id, searchValue })
				);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		}, 500),
		[searchValue]
	);
	useEffect(() => {
		getProjects();
	}, [searchValue, dispatch]);

	if (loading) {
		return <PyramidLoader />;
	} else {
		return (
			<PrivateRoute>
				<div className="flex flex-col gap-20 h-full items-start justify-start w-full container pt-20">
					<div className="head flex flex-col sm:flex-row gap-10 w-full justify-between sm:items-start items-center">
						<p className="font-bold text-4xl">Projects : {projects.length}</p>
						<Search value={searchValue} setValue={setSearchValue} />
					</div>
					<div className="flex gap-5 w-full md:justify-start justify-center flex-wrap">
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
