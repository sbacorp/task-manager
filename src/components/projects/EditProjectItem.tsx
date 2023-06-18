import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";
import { IProject } from "@/store/slices/types";
import { editProject } from "@/store/slices/projectSlice";
import supabase from "@/lib/supabaseClient";

function EditProjectItem({ project }: { project: IProject }) {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState(project.title);
	const [desc, setDesc] = useState(project.desc);
	const profile = useAppSelector((state) => state.profileSlice.profile?.id);
	const [inviteUser, setInviteUser] = useState<string>("");
	const onClickEdit = async () => {
		if (profile) {
			const { data } = await supabase
				.from("profiles")
				.select("id")
				.eq("email", inviteUser);
			
			const profileId = data?.[0].id;
			dispatch(
				editProject({
					id: project.id,
					title: title ? title : project.title,
					desc: desc,
					profile_id: profile,
					users: project.users ? project.users.concat(profileId) : [profileId],
				})
			);
		}
		setTitle("");
		setDesc("");
	};

	return (
		<>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button className="text-base rounded px-4 py-2 bg-dark6 hover:bg-dark4 transition-all duration-300">
						Edit
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<div className="flex justify-center items-center">
						<Dialog.Overlay className="fixed inset-0 bg-black/30" />
						<Dialog.Content
							onCloseAutoFocus={() => {
								setTitle("");
								setDesc("");
							}}
							onEscapeKeyDown={() => {
								setTitle("");
								setDesc("");
							}}
							className=" border-gray9 opacity-1 bg-white border-2 rounded-md fixed w-screen max-w-md top-1/3 p-6 focus:outline-none"
						>
							<Dialog.Title className="font-medium text-lg mb-6">
								Edit project
							</Dialog.Title>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="title"
								>
									Title
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									type="text"
									placeholder="Введите title доски"
								/>
							</fieldset>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="desc"
								>
									Description
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="desc"
									value={desc}
									onChange={(e) => setDesc(e.target.value)}
									type="text"
									placeholder="Введите description доски"
								/>
							</fieldset>
							<fieldset className="flex gap-5 items-center mb-4">
								<label
									className="font-nurmal text-base text-purple text-right w-24"
									htmlFor="title"
								>
									Приглосить пользователя
								</label>
								<input
									className="w-full flex-1 inline-flex items-center justify-center rounded-md px-3 text-base text-purple shadow-lg h-9 focus:shadow-p duration-300 transition-all"
									id="title"
									value={inviteUser}
									onChange={(e) => setInviteUser(e.target.value)}
									type="text"
									placeholder="Введите email пользователя"
								/>
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
										onClick={onClickEdit}
										className="border-solid border-2 border-black p-3 rounded-md bg-black text-white hover:bg-transparent hover:text-purple duration-300 transition-all disabled:cursor-not-allowed disabled:bg-gray2 disabled:border-gray2  background"
									>
										Apply
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

export default EditProjectItem;
