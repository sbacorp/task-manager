import { ReactNode } from "react";
import {
	createServerSupabaseClient,
	User,
} from "@supabase/auth-helpers-nextjs";
interface PrivateRouteProps {
	children: ReactNode;
	user?: User;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	return <>{children}</>;
};

export default PrivateRoute;

export const getServerSideProps = async (ctx: any) => {
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
