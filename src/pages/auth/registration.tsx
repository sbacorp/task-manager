import { useState, FormEvent } from "react";
import SignLayout from "@/components/signLayout";
import supabase from "../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm,SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

function Registration() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [message, setMessage] = useState("");
interface IFormInput {
	userName: string;
	password: string;
	email:string
}
	const handleSignUp:SubmitHandler<IFormInput> = async (data) => {
		const { data: user, error } = await supabase.auth.signUp({
			email:data.email,
			password:data.password,
		});
		if (user.user) {
			const {  error } = await supabase.from("profiles").insert([
				{
					id: user.user.id,
					userName: data.userName,
					email: user.user.email,
				},
			]);
			if(error){
				toast.error(error.message);
			}
		}
		if (error) {
			toast.error(error.message);
		} else {
			toast.warn("Проверьте почту");
			setTimeout(() => router.push("/auth/login"), 1000);
		}
	};
	console.log(errors)
	return (
		<SignLayout>
			<div className="flex flex-col items-center gap-7 font-serif">
				<p className="text-white font-normal text-22">Регистрация</p>
				<form
					onSubmit={handleSubmit(handleSignUp)}
					className="flex flex-col gap-7"
				>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Никмейм</p>
						<input
							{...(register("userName"),
							{
								required: true,
								minLength: 4,
							})}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="text"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Электроннаяя почта</p>
						<input
							{...(register("email"),
							{
								required: true,
							})}
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
							{...(register("password"),
							{
								required: true,
								minLength: 8,
							})}
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
						<Link className="text-dark font-normal text-base" href="/auth/login">
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
