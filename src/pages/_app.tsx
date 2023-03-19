import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import  wrapper  from "../store";
 function App({ Component, pageProps }: AppProps) {

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
	}

export default wrapper.withRedux(App);