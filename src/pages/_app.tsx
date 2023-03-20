import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import wrapper from "../store";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { Provider } from "react-redux";
const progress = new ProgressBar({
	size: 4,
	color: "#0B7285",
	className: "z-50",
	delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function App({ Component, pageProps, ...rest }: AppProps) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	const { store, props } = wrapper.useWrappedStore(rest);
	return (
		<Provider store={store}>
			<SessionContextProvider
				supabaseClient={supabaseClient}
				initialSession={pageProps.initialSession}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</SessionContextProvider>
		</Provider>
	);
}

export default App;
