import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";
import { addProject, fetchProjects } from "@/store/slices/projectsSlice";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { IProject } from "@/store/slices/types";

const colors = [
	{ colorName: "MIDNIGHT", color: "midnight" },
	{ colorName: "SKY", color: "sky" },
	{ colorName: "YODA", color: "yoda" },
	{ colorName: "GRAP", color: "bg-grape7" },
	{ colorName: "PINK", color: "bg-pink6" },
	{ colorName: "VIOLET", color: "bg-violet7" },
];

type buttonProps = {
	title?: string;
	onClick?: (event: MouseEvent) => void;
};

function AddProject(props: buttonProps) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [color, setColor] = useState("");
	const profile = useAppSelector((state) => state.profileSlice.profile?.id);

	const onClickAdd = async () => {		
		if (profile) {
			const newProject: IProject = {
				title: title,
				desc: desc,
				color: color,
				id: Math.trunc(Math.random() * 100000).toString(),
				profile_id: profile,
				users:[]
			};
			await dispatch(addProject(newProject));
			await dispatch(fetchProjects({ profileId: profile, searchValue: "" }));
		}
		setTitle("");
		setDesc("");
	};

	return (
		<>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<div className="flex  items-center text-center relative justify-center w-64 h-72 bg-dark9 py-10 px-3 border rounded-xl border-solid border-black gap-3 cursor-pointer hover:bg-dark6 transition-all duration-300 hover:border-dark3">
						<p className="text-xl font-semibold capitalize">Создать проект</p>
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="32"
								viewBox="0 96 960 960"
								width="32"
							>
								<path
									d="M479.825 860.065q-14.499 0-24.195-9.82-9.695-9.821-9.695-24.245V610.065H230q-14.424 0-24.245-9.871-9.82-9.871-9.82-24.369 0-14.499 9.82-24.195 9.821-9.695 24.245-9.695h215.935V326q0-14.424 9.871-24.245 9.871-9.82 24.369-9.82 14.499 0 24.195 9.82 9.695 9.821 9.695 24.245v215.935H730q14.424 0 24.245 9.871 9.82 9.871 9.82 24.369 0 14.499-9.82 24.195-9.821 9.695-24.245 9.695H514.065V826q0 14.424-9.871 24.245-9.871 9.82-24.369 9.82Z"
									fill="white"
								/>
							</svg>
						</div>
					</div>
				</Dialog.Trigger>
				<Dialog.Portal>
					<div className="flex justify-center items-center">
						<Dialog.Overlay className="fixed inset-0 bg-black " />
						<Dialog.Content
							onCloseAutoFocus={() => {
								setTitle("");
								setColor("");
								setDesc("");
							}}
							onEscapeKeyDown={() => {
								setTitle("");
								setColor("");
								setDesc("");
							}}
							className=" border-gray9 opacity-1 bg-white border-2 rounded-md fixed w-screen max-w-md top-1/3 p-6 focus:outline-none"
						>
							<Dialog.Title className="font-medium text-lg mb-6">
								Создание доски
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
									placeholder="Введите название доски"
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
									placeholder="Введите описание доски"
								/>
							</fieldset>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="desc"
								>
									Цвет
								</label>
								<RadioGroup.Root
									className="flex gap-2.5"
									defaultValue="BLUE"
									aria-label="View density"
								>
									{colors.map((el, i) => {
										return (
											<RadioGroup.Item
												key={i}
												className={`bg-${el.color}
													 w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default`}
												value={el.color}
												onClick={() => setColor(el.color)}
											>
												<RadioGroup.Indicator
													className={`flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] `}
												/>
											</RadioGroup.Item>
										);
									})}
								</RadioGroup.Root>
							</fieldset>
							<div
								style={{
									display: "flex",
									marginTop: 25,
									justifyContent: "flex-end",
								}}
							>
								<Dialog.Close asChild>
									<button
										disabled={!title.trim().length}
										onClick={onClickAdd}
										className="border-solid border-2 border-black p-3 rounded-md bg-black text-white hover:bg-transparent hover:text-purple duration-300 transition-all disabled:cursor-not-allowed disabled:bg-gray2 disabled:border-gray2  background"
									>
										Создать
									</button>
								</Dialog.Close>
							</div>
							<Dialog.Close asChild>
								<button
									className=" rounded-full h-6 w-6 inline-flex items-center justify-center text-purple absolute top-3 right-3 border border-solid hover:bg-black hover:text-white duration-300 transition-all"
									aria-label="Close"
									onClick={() => {
										setTitle("");
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

export default AddProject;
