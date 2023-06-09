import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
function SignLayout({ children }: { children: ReactNode }) {
	return (
		<motion.div
			{...FADE_IN_ANIMATION_SETTINGS}
			className="mt-20 flex gap-10 h-full flex-col lg:flex-row items-center justify-center"
		>
			<div className="about flex flex-col gap-5 max-w-md text-white font-serif">
				<div className="title flex gap-1">
					<Image src="/assets/okIcon.svg" alt="ok" width={20} height={20} />
					<p className="text-semibold text-base leading-tight">
						Project Management Application
					</p>
				</div>
				<div className="title-2nd text-42 font-serif font-bold">
					Everything you need in one place
				</div>
				<p className="desc text-lg font-normal text-dark1 hidden md:block">
					Manage your boards with Drag-n-Drop, create additional boards and
					tasks.
				</p>
			</div>
			<div className="w-80 md:w-464 form-contaier rounded-xl bg-dark9 px-2 py-6 md:px-10 md:py-16">
				{children}
			</div>
		</motion.div>
	);
}

export default SignLayout;
