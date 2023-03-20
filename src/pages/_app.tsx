import Layout from "@/components/layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import wrapper from "../store";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

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
