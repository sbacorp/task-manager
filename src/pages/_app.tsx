import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import  wrapper  from "../store";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
	size: 4,
	color: '#0B7285',
	className: 'z-50',
	delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)


function App({ Component, pageProps }: AppProps) {

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
	}

export default wrapper.withRedux(App);