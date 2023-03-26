import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import Meta from "./meta";
import Header from "../header";
import Footer from "../footer";
import Profile from "../Profile";
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
	const [isOpen, setIsOpen] = useState<boolean>(false);
	 useEffect(() => {
			if (isOpen) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		}, [isOpen]);
	
	return (
		<div
			className={`${inter.className} text-white font-serif min-h-screen flex flex-col w-full overflow-hidden`}
		>
			<Meta {...meta} />

			<Header isOpen={isOpen} setIsOpen={setIsOpen}/>
			{isOpen && <Profile setIsOpen={setIsOpen} />}
			<motion.main
				{...FADE_IN_ANIMATION_SETTINGS}
				className="flex w-full flex-grow flex-auto flex-col items-center justify-center pt-16"
			>
				{children}
			</motion.main>

			<Footer />
		</div>
	);
}
