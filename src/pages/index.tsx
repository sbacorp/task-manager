import Image from "next/image";
import Link from "next/link";
import HomeSection from "@/components/main/HomeSection";
import { cards, ItemAnimation, sections } from "@/lib/constants";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import Gradient from "@/components/gradient";
import { ICard } from "@/../typings";

const Index: NextPage = () => {
	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<section className="relative flex flex-col gap-4 text-center items-center justify-center py-16 w-screen overflow-hidden">
					<div className="container">
						<p className="title1 text-white font-serif text-xl font-semibold">
							Project Management Application
						</p>
						<p className="title2 text-3xl sm:text-4xl text-white font-semibold font-serif md:text-6xl">
							Collaborate and work
							<br /> faster together.
						</p>
						<p className="desc text-dark2 text-lg font-normal sm:max-w-md max-w-xs text-center mx-auto mb-10">
							Create, share, and get feedback with collaborative boards for
							quick development.
						</p>
						<Link
							href="/projects"
							className="text-white px-4 py-1.5 text-lg font-semibold  bg-cyan7 rounded-lg"
						>
							Create a kanban board
						</Link>
					</div>
				</section>
				<section className="flex flex-col md:flex-row justify-center gap-12 items-center py-14 container px-2">
					{cards.map((el: ICard, i: number) => {
						return (
							<motion.div
								key={i}
								custom={i}
								variants={ItemAnimation}
								className=" card w-full md:w-60 lg:w-80 h-60 md:h-80 flex-shrink-0 md flex flex-col md:gap-7 gap-2 md:py-12 py-6 px-5 bg-gray-600 items-center text-center text-white bg-dark"
							>
								<Image src={el.src} alt={el.title} width={40} height={40} />
								<h2 className="text-base md:text-lg font-semibold">
									{el.title}
								</h2>
								<p className="sm:text-base font-normal">{el.desc}</p>
							</motion.div>
						);
					})}
				</section>
				{sections.map((elem, i) => (
					<HomeSection {...elem} key={i} />
				))}
			</motion.div>
		</>
	);
};
export default Index;
