import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";
import { ITask } from "@/store/slices/types";
import supabase from "@/lib/supabaseClient";
import { updateTaskInfo } from "@/store/slices/tasksSlice";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const cardLabels = [

	{
		type: "performance",
		bg: "bg-[#0079bf]",
	},
	{
		type: "bug",
		bg: "bg-[#eb5a46]",
	},
	{
		type: "feature",
		bg: "bg-[#61bd4f]",
	},
	{
		type: "information",
		bg: "bg-[#ff9f1a]",
	},
	{
		type: "warning",
		bg: "bg-[#f2d600]",
	},
];
function EditTaskModal({ task }: { task: ITask }) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState(task!.title);
	const [desc, setDesc] = useState(task.description||'');
	const profile = useAppSelector((state) => state.profileSlice.profile?.id);
	const [assignedTo, setAssignedTo] = useState<string>(task.assignedTo||'');
	const [label, setLabel] = useState<string>('')
	const onClickEdit = async () => {
		if (profile) {
			let profileId = "";
			const { data } = await supabase
				.from("profiles")
				.select("id")
				.eq("userName", assignedTo);
			if (data && data[0]) {
				profileId = data![0]?.id;
			}
			dispatch(
				updateTaskInfo({
					id: task.id,
					title: title ? title : task.title,
					description: desc ? desc : task.description,
					position: task.position,
					column_id: task.column_id,
					assignedTo: assignedTo ? assignedTo : undefined,
					label: label ? label : undefined,
				})
			);
		}
		setTitle("");
		setDesc("");
	};
	const onClickDelete = async () => {
		const { error } = await supabase.from("tasks").delete().eq("id", task.id);
		if (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<Pencil2Icon className="cursor-pointer" />
				</Dialog.Trigger>
				<Dialog.Portal>
					<div className="flex justify-center items-center">
						<Dialog.Overlay className="fixed inset-0 bg-black/30" />
						<Dialog.Content
							onCloseAutoFocus={() => {
								setTitle("");
								setDesc("");
								setAssignedTo("");
							}}
							onEscapeKeyDown={() => {
								setTitle("");
								setDesc("");
								setAssignedTo("");
							}}
							className=" border-gray9 opacity-1 bg-white border-2 rounded-md fixed w-screen max-w-md top-1/3 p-6 focus:outline-none"
						>
							<Dialog.Title className="font-medium text-lg mb-6">
								Редактировать проект
							</Dialog.Title>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="title"
								>
									Название
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									type="text"
									placeholder="Введите название задачи"
								/>
							</fieldset>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="desc"
								>
									Описание
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="desc"
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
									type="text"
									placeholder="Введите описание задачи"
								/>
							</fieldset>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="assignedTo"
								>
									Назначить пользователю
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="assignedTo"
									value={assignedTo}
									onChange={(e) => setAssignedTo(e.target.value)}
									type="text"
									placeholder="Введите имя пользователя"
								/>
							</fieldset>
							<div className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="label"
								>
									Добавить лейбл
								</label>
								<RadioGroup.Root
									className="flex gap-2.5"
									aria-label="View density"
									id="label"
								>
									{cardLabels.map((el, i) => {
										return (
											<RadioGroup.Item
												key={i}
												className={`${el.bg}
													 w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
												value={el.bg}
												onClick={() => setLabel(el.bg)}
											>
												<RadioGroup.Indicator
													className={`flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] `}
												/>
											</RadioGroup.Item>
										);
									})}
								</RadioGroup.Root>
							</div>
							<div className="flex justify-between w-full">
								<Dialog.Close asChild>
									<button
										onClick={onClickDelete}
										className="border-solid border-2 border-black p-3 rounded-md bg-white text-back hover:bg-transparent hover:text-purple duration-300 transition-all disabled:cursor-not-allowed disabled:bg-gray2 disabled:border-gray2  background hover:text-white hover:bg-black "
									>
										Удалить
									</button>
								</Dialog.Close>
								<Dialog.Close asChild>
									<button
										disabled={!title.trim().length}
										onClick={onClickEdit}
										className="border-solid border-2 border-black p-3 rounded-md bg-black text-white hover:bg-transparent hover:text-purple duration-300 transition-all disabled:cursor-not-allowed disabled:bg-gray2 disabled:border-gray2  background"
									>
										Применить
									</button>
								</Dialog.Close>
							</div>
							<Dialog.Close asChild>
								<button
									className=" rounded-full h-6 w-6 inline-flex items-center justify-center text-purple absolute top-3 right-3 border border-solid hover:bg-black hover:text-white duration-300 transition-all"
									aria-label="Close"
									onClick={() => {
										setTitle("");
										setAssignedTo("");
										setDesc("");
									}}
								>
									<Cross2Icon />
								</button>
							</Dialog.Close>
						</Dialog.Content>
					</div>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}

export default EditTaskModal;
