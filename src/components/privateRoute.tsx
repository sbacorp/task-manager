import { ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const router = useRouter();

	const user = useSelector((state: RootState) => state.user.user);
	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, []);

	return <>{children}</>;
};

export default PrivateRoute;
