import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
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
	//const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<div
			className={`${inter.className} text-white font-serif min-h-screen flex flex-col w-full overflow-hidden relative`}
		>
			<Meta {...meta} />

			<Header />
<<<<<<< HEAD
			<Profile />
			<motion.main
				{...FADE_IN_ANIMATION_SETTINGS}
				className="flex w-full flex-grow flex-auto flex-col items-center justify-center pt-16"
			>
				{children}
			</motion.main>
=======
				<motion.main
					{...FADE_IN_ANIMATION_SETTINGS}
					className="flex w-full flex-grow flex-auto flex-col items-center justify-start pt-16"
				>
					{children}
				</motion.main>
>>>>>>> 2c04b1e10eca06cfb4fe77c8027d5d30f2b18f01
			<Footer />
		</div>
	);
}
