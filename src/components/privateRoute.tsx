import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabaseClient";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			const {data} = await supabase.auth.getSession();
			if (!data.session) {
				router.push("/login");
			} else {
				setLoading(false);
			}
		};

		checkAuth();
	}, [router]);

	return <>{!loading && children}</>;
};

export default PrivateRoute;
