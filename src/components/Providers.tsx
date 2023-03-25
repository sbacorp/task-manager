"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PersistGate } from "redux-persist/integration/react";

function Providers({ children }: { children: React.ReactNode }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());
	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			<PersistGate loading={'loading'} persistor={persistor}>
				<Provider store={store}>
					<AnimatePresence>{children}</AnimatePresence>
				</Provider>
			</PersistGate>
		</SessionContextProvider>
	);
}

export default Providers;
