import SignLayout from "@/components/signLayout";
import supabase from "../../lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
	userName: yup.string().min(4).max(16).required(),
});

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
	} = useForm<IFormInput>({ resolver: yupResolver(schema) });
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
					autoComplete="false"
					onSubmit={handleSubmit(handleSignUp)}
					className="flex flex-col gap-7"
				>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Никмейм</p>
						<input
							autoComplete="false"
							{...register("userName")}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="text"
						/>

						{errors.userName && errors.userName.type === "required" && (
							<span className="text-white text-base">
								Поле обязательно для заполнения
							</span>
						)}
						{errors.userName && errors.userName.type === "min" && (
							<span className="text-white text-base">Минимум 4 символа</span>
						)}
						{errors.userName && errors.userName.type === "max" && (
							<span className="text-white text-base">Максимум 16 символов</span>
						)}
					</div>

					<div className="flex flex-col gap-3">
						<p className="text-dark">Электроннаяя почта</p>
						<input
							{...register("email")}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
							type="email"
						/>

						{errors.email && errors.email.type === "required" && (
							<p className="text-white text-base">
								Поле обязательно для заполнения
							</p>
						)}
						{errors.email && errors.email.type === "pattern" && (
							<p className="text-white text-base">Здесь должна быть почта</p>
						)}
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-dark">Пароль</p>
						<input
							{...register("password", {
								minLength: 8,
							})}
							className="block py-1.5 px-3 w-full bg-dark7 text-gray0  rounded lg:w-96"
							type="password"
							id="password"
							autoComplete="new-password"
						/>
						{errors.password && errors.password.type === "min" && (
							<span className="text-white text-base" role="alert">
								Минимум 8 символов
							</span>
						)}
						{errors.password && errors.password.type === "required" && (
							<span className="text-white text-base">
								Поле обязательно для заполнения
							</span>
						)}
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
