'use client'
import { ReactNode, use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
interface PrivateRouteProps {
	children: ReactNode;
	user: User
}

const PrivateRoute = ({ children, user }: PrivateRouteProps) => {
	return <>{children}</>;
};

export default PrivateRoute;

export const getServerSideProps = async (ctx:any) => {
	const supabase = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};