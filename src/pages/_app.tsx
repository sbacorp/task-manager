import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { Provider } from "react-redux";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { wrapper } from "@/store";
import { PersistGate } from "redux-persist/integration/react";


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
	const { store, props } = wrapper.useWrappedStore(rest);
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	return (
		<SessionContextProvider
      supabaseClient={supabaseClient}
    >
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
			</SessionContextProvider>
	);
}

export default App;
