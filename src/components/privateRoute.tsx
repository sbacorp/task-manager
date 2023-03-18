import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const user = useSelector((state: RootState) => state.user.user);
	useEffect(() => {
	if (!user) {
		
		router.push("/");
	}
	else{
		setLoading(false);
	}
	}, [])
	return <>{!loading && children}</>;
};

export default PrivateRoute;
