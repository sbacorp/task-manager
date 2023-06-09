import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";

import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/store";
import { setProfile } from "@/store/slices/profileSlice";
import { EyeActive } from "../../../typings";
const EyeAction = dynamic(() => import("./EyeActive"));

function EditProfile() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const profile = useAppSelector((state) => state.profileSlice.profile);
	const [userName, setUserName] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isOpen1, setIsOpen1] = useState<EyeActive>([false, "password"]);
	const [isOpen2, setIsOpen2] = useState<EyeActive>([false, "password"]);

	async function handleUpdateName() {
		if (!profile) return;
		try {
			const { error } = await supabase
				.from("profiles")
				.update({ userName })
				.eq("id", profile.id);
			dispatch(setProfile({ ...profile, userName }));
			setUserName("");
			router.push("/");
			if (error) {
				throw error;
			}
		} catch (err) {
			console.error("Ошибка при обновлении профиля:", err);
		}
	}

	async function handleUpdatePassword() {
		if (!profile) return;
		const { error: checkError } = await supabase.auth.signInWithPassword({
			email: profile?.email,
			password: currentPassword,
		});
		if (checkError) {
			console.error("Error when checking the current password:", checkError);
			setMessage("wrong current Password");
			return;
		}

		const { error: updateError } = await supabase.auth.updateUser({
			email: profile.email,
			password: newPassword,
		});
		if (updateError) {
			console.log("Failed to update password:", updateError);
			return;
		}
		setMessage(
			"Your Password has been successfully changed. You can close the dialog window"
		);
		setCurrentPassword("");
		setNewPassword("");
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
					Edit
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content
					onCloseAutoFocus={() => {
						setUserName("");
						setCurrentPassword("");
						setNewPassword("");
						setMessage("");
					}}
					onEscapeKeyDown={() => {
						setUserName("");
						setCurrentPassword("");
						setNewPassword("");
						setMessage("");
					}}
					className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[305px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-dark9  focus:outline-none flex items-center justify-center z-50"
				>
					<Tabs.Root className="flex flex-col w-[300px] " defaultValue="tab1">
						<Tabs.List
							className="shrink-0 flex border-b border-solid border-dark"
							aria-label="Manage your account"
						>
							<Tabs.Trigger
								className="bg-dark9 h-[45px] flex-1 flex items-center justify-center text-lg text-white select-none first:rounded-tl-md last:rounded-tr-md border-solid data-[state=active]:border-b-2   outline-none cursor-pointer"
								value="tab1"
							>
								Profile
							</Tabs.Trigger>
							<Tabs.Trigger
								className="bg-dark9 h-[45px] flex-1 flex items-center justify-center text-lg text-white select-none first:rounded-tl-md last:rounded-tr-md border-solid data-[state=active]:border-b-2   outline-none cursor-pointer"
								value="tab2"
							>
								Password
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content
							className="grow p-5 bg-dark9 rounded-b-md outline-none "
							value="tab1"
						>
							<p className="mb-5 text-white text-base">
								Make changes to your Profile Name. Click save when you are
								finished.
							</p>
							<fieldset className="mb-[15px] w-full flex flex-col justify-start">
								<label
									className=" text-sm mb-2.5 text-white block"
									htmlFor="username"
								>
									Profile Name
								</label>
								<input
									className="grow shrink-0 rounded px-2.5 text-[15px] bg-dark7 text-white h-[35px] outline-none"
									id="username"
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
								/>
							</fieldset>
							<div className="flex justify-center mt-5">
								<Dialog.Close asChild>
									<button
										onClick={handleUpdateName}
										disabled={!userName}
										className="inline-flex bg-cyan6 hover:bg-cyan9 disabled:bg-cyan4 items-center border border-white border-solid justify-center rounded px-[15px] text-base font-medium h-[35px] text-white"
									>
										Сохранить изменения
									</button>
								</Dialog.Close>
							</div>
						</Tabs.Content>
						<Tabs.Content
							className="grow p-5 bg-dark9 rounded-b-md outline-none"
							value="tab2"
						>
							<p className="mb-5 text-white text-base leading-normal">
								Change your Password here.
							</p>
							<fieldset className="mb-[15px] w-full flex flex-col justify-start">
								<label
									className="text-sm leading-none mb-2.5 text-white block"
									htmlFor="currentPassword"
								>
									Current Password
								</label>
								<div className="relative">
									<input
										className="grow block w-full shrink-0 rounded px-2.5 text-[15px] bg-dark7 leading-none text-white h-[35px]  outline-none"
										id="currentPassword"
										type={isOpen1[1]}
										value={currentPassword}
										onChange={(e) => setCurrentPassword(e.target.value)}
									/>
									<EyeAction setIsOpen={setIsOpen1} isOpen={isOpen1} />
								</div>
							</fieldset>
							<fieldset className="mb-[15px] w-full flex flex-col justify-start">
								<label
									className="text-sm leading-none mb-2.5 text-white block"
									htmlFor="newPassword"
								>
									New Password
								</label>
								<div className="relative">
									<input
										className="grow shrink-0 block  w-full rounded px-2.5 text-[15px] bg-dark7 leading-none text-white h-[35px] outline-none"
										id="newPassword"
										type={isOpen2[1]}
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<EyeAction setIsOpen={setIsOpen2} isOpen={isOpen2} />
								</div>
								{message && (
									<p
										className={`text-xs ${
											message.length === 27 ? "text-red6" : "text-green9"
										} font-semibold tracking-wide flex items-center gap-2 mt-3`}
									>
										<span className="italic font-titleFont text-2xl font-extrabold">
											!
										</span>{" "}
										{message}
									</p>
								)}
							</fieldset>
							<div className="flex justify-center mt-5 flex-col items-center gap-3">
								<button
									onClick={handleUpdatePassword}
									disabled={!newPassword || !currentPassword}
									className="bg-cyan6 hover:bg-cyan9 disabled:bg-cyan4 inline-flex items-center justify-center rounded px-[15px] text-base leading-none font-medium h-[35px] border border-white border-solid text-white  outline-none"
								>
									Edit Password
								</button>
							</div>
						</Tabs.Content>
					</Tabs.Root>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}

export default EditProfile;
