import Image from "next/image";
import { HomeProps } from "../../typings";
import { ItemAnimation2, ItemAnimation3 } from "@/lib/constants";
import { motion } from "framer-motion";

function HomeSection({ tag, title, desc, imgPath, order }: HomeProps) {
	return (
		<motion.section
		
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
			className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center py-12 container px-2"
		>
			<motion.div className="" custom={1} variants={ItemAnimation3}>
				<div className="tag flex gap-2">
					<Image
						src="assets/okIcon.svg"
						alt="ok"
						width={20}
						height={20}
						className="order-first md:order-last"
					/>
					<p className="text-semibold text-base leading-tight">{tag}</p>
				</div>
				<p className="title text-3xl md:text-42 font-serif font-bold">
					{title}
				</p>
				<p className="desc text-lg font-normal text-dark1 block">{desc}</p>
			</motion.div>
			<motion.div custom={1} variants={ItemAnimation2}>
				<Image
					src={imgPath}
					alt="projectsPreviewImg"
					width={640}
					height={420}
					className={`${order} order-first md:w-96 md:h-auto xl:w-[640px] flex-shrink`}
				/>
			</motion.div>
		</motion.section>
	);
}

export default HomeSection;
