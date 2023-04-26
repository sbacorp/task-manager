import { useState, FormEvent } from "react";
import SignLayout from "@/components/signLayout";
import supabase from "../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInput {
	userName: string;
	password: string;
	email: string;
}

export default function Registration() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({});
	const router = useRouter();
	console.log(errors, "errors");
	const handleSignUp = async (data: IFormInput) => {
		console.log(data);

		const { data: user, error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
		});
		if (user.user) {
			const { error } = await supabase.from("profiles").insert([
				{
					id: user.user.id,
					userName: data.userName,
					email: user.user.email,
				},
			]);
			if (error) {
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
							{...register("userName", {
								required: "Поле обязательно для заполнения",
								minLength: {
									value: 4,
									message: "Минимум 4 символа",
								},
								maxLength: {
									value: 15,
									message: "Максимум 15 символов",
								},
							})}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="text"
						/>

						{errors.userName && (
							<p className="text-white text-base">{errors.userName.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Электроннаяя почта</p>
						<input
							{...register("email", {
								required: "Поле обязательно для заполнения",
							})}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="email"
						/>
						{errors.email && (
							<p className="text-white text-base">{errors.email.message}</p>
						)}
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Пароль</p>
						<input
							{...register("password")}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0  rounded lg:w-96"
							type="password"
						/>
					</div>
					<div className="flex gap-1 items-center">
						<p className="text-dark2 font-normal text-base">
							Уже есть аккаунт?
						</p>
						<Link
							className="text-dark font-normal text-base"
							href="/auth/login"
						>
							Войти
						</Link>
					</div>
					<input
						type="submit"
						value="Создать аккаунт"
						className="cursor-pointer self-center flex items-center rounded w-fit justify-center bg-dark6 text-white font-semibold text-base px-4 py-2"
					/>
				</form>
			</div>
		</SignLayout>
	);
}
