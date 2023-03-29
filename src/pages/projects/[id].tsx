import { useAppSelector } from "@/store";
import { useRouter } from "next/router";

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
