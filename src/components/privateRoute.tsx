import { ReactNode } from "react";
import {
	createServerSupabaseClient
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
		return <>{children}</>;
};

export default PrivateRoute;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
