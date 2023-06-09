"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import supabase from "@/lib/supabaseClient";
import { setUser } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const AuthButtons: React.FC = () => {
	const user = useAppSelector((store) => store.userSlice.user);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [size, setSize] = useState<number>(1024);
	useEffect(() => {
		if (window) {
			setSize(window.innerWidth);
		}
	}, []);
	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut();
			dispatch(setUser(null));
		} catch (error) {
			console.log(error);
		} finally {
			await router.push("/");
		}
	};

	if (user) {
		return (
			<>
				<button
					onClick={handleSignOut}
					className="border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
				>
					Sign out
				</button>
			</>
		);
	}

	return (
		<div className="flex items-center flex-col md:flex-row gap-5">
			<Link
				href="/auth/login"
				className="signIn  text-base text-white font-serif"
			>
				Sigh in
			</Link>
			{size > 960 && (
				<Link
					href="/auth/registration"
					className="signUp hidden md:block border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
				>
					Sign up
				</Link>
			)}
		</div>
	);
};

export default AuthButtons;
