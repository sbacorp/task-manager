import { useState, FormEvent } from "react";
import SignLayout from "@/components/signLayout";
import supabase from "../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";

function Registration() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [message, setMessage] = useState("");

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();
		const { data: user, error } = await supabase.auth.signUp({
			email,
			password,
		});
		if (user.user) {		
			const { data, error } = await supabase.from("profiles").insert([
				{
					id: user.user.id,
					userName: userName,
					email: user.user.email
				},
			]);
		}
		if (error) {
			setMessage(error.message);
		} else {
			setMessage("Проверьте почту");
			setTimeout(() => router.push("/login"), 1000);
		}
	};
	return (
		<SignLayout>
			<div className="flex flex-col items-center gap-7 font-serif">
				<p className="text-white font-normal text-22">Регистрация</p>
				<form onSubmit={handleSignUp} className="flex flex-col gap-7">
					<div className="flex flex-col gap-3">
						<p className="text-dark">Никмейм</p>
						<input
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="text"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Электроннаяя почта</p>
						<input
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Пароль</p>
						<input
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0  rounded lg:w-96"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="flex gap-1 items-center">
						<p className="text-dark2 font-normal text-base">
							Уже есть аккаунт?
						</p>
						<Link className="text-dark font-normal text-base" href="/login">
							Войти
						</Link>
					</div>
					<button
						type="submit"
						className=" self-center flex items-center rounded w-fit justify-center bg-dark6 text-white font-semibold text-sm px-4 py-2"
					>
						Создать аккаунт
					</button>
				</form>
				{message && (
					<p className="text-white absolute bottom-10 left-1/2">{message}</p>
				)}
			</div>
		</SignLayout>
	);
}

export default Registration;
