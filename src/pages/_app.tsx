import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import Providers from "@/components/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const progress = new ProgressBar({
	size: 4,
	color: "#0B7285",
	className: "z-50",
	delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Layout>
				<Component {...pageProps} />
				<ToastContainer />
			</Layout>
		</Providers>
	);
}

export default App;
