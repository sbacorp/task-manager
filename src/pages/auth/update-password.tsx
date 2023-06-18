import React, { useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";
import SignLayout from "@/components/signLayout";

function UpdatePassword() {
	const [newPassword, setNewPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword === repeatPassword) {
			const { error: updateError } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (updateError) {
				console.log("Ошибка при обновлении пароля:", updateError);
				return;
			}
			setMessage("Your Password has been successfully changed!");
			setNewPassword("");
			setRepeatPassword("");
			router.push("/login");
		} else {
			setMessage("The passwords don't match!");
		}
	};

	return (
		<SignLayout>
			<div className="flex flex-col gap-7 font-serif items-center">
				<p className="text-white font-normal text-22 mt-5">Сброс пароля</p>
				<form onSubmit={handleResetPassword} className="flex flex-col gap-7">
					<div className="flex flex-col gap-3">
						<p className="text-dark">New Password</p>
						<input
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Повторите Password</p>
						<input
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="password"
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
							required
						/>
					</div>
					<button
						disabled={!repeatPassword || !newPassword}
						type="submit"
						className=" self-center flex items-center rounded w-fit justify-center hover:bg-dark7 disabled:bg-dark3 bg-dark6 text-white font-semibold text-sm px-4 py-2"
					>
						Update Password
					</button>
				</form>
				{message && <p className="text-white absolute">{message}</p>}
			</div>
		</SignLayout>
	);
}

export default UpdatePassword;
