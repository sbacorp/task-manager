import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../../../../../store";
import { updateTask } from "../../../../../store/slices/tasksSlice";
import { ITask } from "@/store/slices/types";

interface Props {
	task: ITask;
	index: number;
}

const Task = ({ task, index }: Props) => {
	const dispatch = useAppDispatch();

	// const handleCompleteChange = async () => {
	// 	const updatedTask = { ...task, title: task.title };
	// 	await dispatch(updateTask(updatedTask));
	// };

	return (
		<Draggable draggableId={String(task.id)} index={index}>
			{(provided) => (
				<div
					className="p-4 my-2 rounded-md shadow-sm bg-dark6"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<div className="flex items-center justify-between">
						<div className="font-semibold font-serif text-white">
							{task.title}
						</div>
					</div>
					<div className="text-gray-500">{task.description}</div>
				</div>
			)}
		</Draggable>
	);
};

export default Task;
