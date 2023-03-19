import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import Meta from "./meta";
import Header from "../header";
import Footer from  '../footer'
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

const inter = Open_Sans({ subsets: ["latin"] });

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
		<div
			className={`${inter.className} text-white font-serif min-h-screen flex flex-col w-full overflow-x-hidden`}
		>
			<Meta {...meta} />

			<Header/>
			<AnimatePresence>
				<motion.main
					{...FADE_IN_ANIMATION_SETTINGS}
					className="flex w-full flex-grow flex-auto flex-col items-center justify-center py-16"
				>
					{children}
				</motion.main>
			</AnimatePresence>
			<Footer />
		</div>
	);
}
