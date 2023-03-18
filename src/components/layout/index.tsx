// import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

import Meta from "./meta";
import Header from "../header";

export default function Layout({
	meta,
	children,
}: {
	meta?: {
		title?: string;
		description?: string;
		image?: string;
	};
	children: ReactNode;
}) {

	return (
		<div className="min-h-screen flex flex-col">
			<Meta {...meta} />
			
				<Header links={[{ href: "about", title: "О проекте" }]} />
			
			<main className="flex w-full flex-auto  flex-col items-center justify-center py-32">
				{children}
			</main>
			<div className=" w-full border-t border-dark2 py-5 text-center">
				<p className="text-white">Rollin</p>
			</div>
		</div>
	);
}
