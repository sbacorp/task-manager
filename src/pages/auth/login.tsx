import SignLayout from "@/components/signLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import supabase from "../../lib/supabaseClient";
import { setUser } from "../../store/slices/userSlice";
import { setProfile, IProfile } from "../../store/slices/profileSlice";
import { useDispatch } from "react-redux";
import { LoginType } from "../../../typings";
import useSWR from "swr";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [signType, setSignType] = useState<LoginType>("signin");
	const router = useRouter();
	const dispatch = useDispatch();

	const handleSignIn = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) {
				setMessage(error.message);
			} else {
				dispatch(setUser(data.user));
				const { data: profile, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", data.user?.id)
					.single();
				if (error) {
					console.error("Error fetching profile:", error);
				} else {
					const userProfile: IProfile = profile as IProfile;
					dispatch(setProfile(userProfile));
				}
				setMessage("Вы успешно вошли в систему!");
				router.push("/projects");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleResetPassword = async (e: FormEvent) => {
		e.preventDefault();

		let { data, error: resetError } = await supabase.auth.resetPasswordForEmail(
			email,
			{
				redirectTo: "http://localhost:3000/auth/update-password",
			}
		);
		if (resetError) {
			setMessage(resetError.message);
			return;
		}
		setMessage("Ссылка для сброса пароля отправлен на вашу почту.");
		router.push("/");
	};

	return (
		<SignLayout>
			{signType === "signin" ? (
				<div className="flex flex-col gap-7 font-serif items-center">
					<p className="text-white font-normal text-22 mt-3">Вход</p>
					<form onSubmit={handleSignIn} className="flex flex-col gap-7">
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
								className="block py-1.5 px-3 w-full bg-dark7 text-gray0 lg:w-96 rounded"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="flex gap-1 items-center">
							<p className="text-dark2 font-normal text-base">
								Ещё нет аккаунта?
							</p>
							<Link
								className="text-dark font-normal text-base"
								href="/auth/login"
							>
								Зарегистрироваться
							</Link>
						</div>
						<button
							disabled={!email || !password}
							type="submit"
							className=" self-center flex items-center rounded w-fit justify-center bg-dark6 text-white font-semibold text-sm px-4 py-2"
						>
							Войти
						</button>
					</form>
					{message && <p className="text-white absolute">{message}</p>}
					<p
						onClick={() => setSignType("reset")}
						className="text-dark items-center justify-center font-medium cursor-pointer underline hover:text-dark2"
					>
						Забыли пароль?
					</p>
				</div>
			) : (
				<div className="flex flex-col gap-4 font-serif items-center">
					<p className="text-white font-normal text-22">Забыли свой пароль?</p>
					<form onSubmit={handleResetPassword} className="flex flex-col gap-7">
						<div className="flex flex-col gap-3">
							<p className="text-dark text-center">
								Вы можете восстановить свой пароль здесь
							</p>
							<div className="flex items-center gap-[1px]">
								<svg
									width="37"
									height="37"
									viewBox="0 0 15 15"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className=""
								>
									<path
										d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
										fill="currentColor"
										fillRule="evenodd"
										clipRule="evenodd"
									></path>
								</svg>
								<input
									className="flex-grow pl-5 outline-none text-base py-[4px] px-3 bg-dark7 text-gray0 lg:w-96 rounded"
									placeholder="Введите почту..."
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
						</div>
						<button
							disabled={!email}
							type="submit"
							className="self-center flex items-center rounded w-fit justify-center bg-dark6 hover:bg-dark7 disabled:bg-dark5 text-white font-semibold text-sm px-4 py-2"
						>
							Сбросить пароль
						</button>
					</form>
					{message && <p className="text-white absolute">{message}</p>}
				</div>
			)}
		</SignLayout>
	);
};

export default SignIn;
