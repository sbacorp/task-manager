import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children, user }: PrivateRouteProps) => {

	
	return <>{children}</>;
};

export default PrivateRoute;

export const getServerSideProps = async (ctx) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: "/",
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