import SignLayout from "@/components/signLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import supabase from "../lib/supabaseClient";
import { setUser } from "../store/slices/userSlice";
import { setProfile, IProfile } from "../store/slices/profileSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
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
					console.log(profile);
					const userProfile: IProfile = profile;
					dispatch(setProfile(userProfile));
				}

				setMessage("Вы успешно вошли в систему!");
				router.push("/projects");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SignLayout>
			<div className="flex flex-col gap-7 font-serif items-center">
				<p className="text-white font-normal text-22">Вход</p>
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
						<Link className="text-dark font-normal text-base" href="/login">
							Зарегистрироваться
						</Link>
					</div>
					<button
						type="submit"
						className=" self-center flex items-center rounded w-fit justify-center bg-dark6 text-white font-semibold text-sm px-4 py-2"
					>
						Войти
					</button>
				</form>
				{message && <p className="text-white absolute">{message}</p>}
			</div>
		</SignLayout>
	);
};

export default SignIn;
