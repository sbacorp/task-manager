"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setUser } from "@/store/slices/userSlice";
import { User } from "@supabase/supabase-js";

function Preloader({ user }: { user: User }) {
	const loaded = useRef(false);
	if (!loaded.current) {
		store.dispatch(setUser(user));
		loaded.current = true;
	}

	return null;
}

export default Preloader;
