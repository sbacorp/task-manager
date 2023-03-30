import Column from "@/components/Column";
import CreateColumn from "@/components/createColumn";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchcolumns } from "@/store/slices/columnsSlice";
import { IColumn } from "@/store/slices/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
function Project() {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const projects = useAppSelector((state) => state.projectsSlice.projects);
	const project = projects.find((b) => b.id == id);

	let columns = useAppSelector((state) => state.columnsReducer.columns);
	useEffect(() => {
		dispatch(fetchcolumns(project!.id));
	}, []);

	const createColumnFn = async () => {
		await dispatch(fetchcolumns(project!.id));
	};

	if (!project) {
		return alert("Проект не найден");
	}
	return (
		<div className="w-full container min-h-[80vh] overflow-hidden flex flex-col items-start justify-start">
			<p>{project.title}</p>
			<DragDropContext className="cols flex gap-10 flex-shrink-0 overflow-x-scroll scroll">
				{columns && columns.map((el: IColumn) => <Column column={el} />)}
				<CreateColumn createColumnF={createColumnFn} />
			</DragDropContext>
		</div>
	);
}

export default Project;
