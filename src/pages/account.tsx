import PrivateRoute from "@/components/privateRoute";

export default function Acount() {
	return (
		<PrivateRoute>
			<p className="text-3xl text-white text-serif">hello</p>
		</PrivateRoute>
	);
}
