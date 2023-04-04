import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../../../../store";
import { updateTask } from "../../../../../store/slices/tasksSlice";
import { ITask } from "@/store/slices/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
import EditTaskModal, { cardLabels } from "./editTask";
interface Props {
	task: ITask;
	index: number;
}

const Task = ({ task, index }: Props) => {


	return (
		<Draggable draggableId={String(task.id)} index={index}>
			{(provided) => (
				<div
					className="p-4 my-2 rounded-md flex items-ceneter bg-dark6 justify-between"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="flex flex-col items-start justify-between gap-2">
						<div className="font-semibold font-serif text-white">
							{task.title}
							<span className="text-gray6"> {task.assignedTo ? `для ${task.assignedTo}` : ""}</span>
						</div>
						<div className="text-gray5">
							{task.description ? task.description : "описания нет"}
						</div>
					</div>
					<div className="flex flex-col justify-between">
						<EditTaskModal task={task} />
						{task.label && (
							<div className={`label w-4 h-1 ${task.label}`} />
						)}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
