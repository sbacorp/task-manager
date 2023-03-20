import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
<<<<<<< HEAD
import wrapper from "../store";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
=======
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
>>>>>>> 15174f88e2e297b493c011055c11f6aa307b93bb

function App({ Component, pageProps }: AppProps) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	
	return (
		<SessionContextProvider
			supabaseClient={supabaseClient}
			initialSession={pageProps.initialSession}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionContextProvider>
	);
}

export default wrapper.withRedux(App);
