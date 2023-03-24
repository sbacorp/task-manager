import React from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store";

const AuthButtons: React.FC = () => {
	
	const user = useSelector((state: RootState) => state.user.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			dispatch(setUser(null));
		} catch (error) {
			console.log(error);
		} finally {
			router.push("/");
		}
	};
	
	if (user) {
		return (
			<>
				<button
					onClick={handleSignOut}
					className="signUp border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
				>
					Выйти
				</button>
			</>
		);
	}

	return (
			<div className="flex items-center flex-col md:flex-row gap-5">
				<Link href="/login" className="signIn  text-base text-white font-serif">
					Вход
				</Link>
				<Link
					href="/registration"
					className="signUp border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
				>
					Регистрация
				</Link>
			</div>
	);
};

export default AuthButtons;
