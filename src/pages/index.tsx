import Image from "next/image";
import Link from "next/link";
import HomeSection from "@/components/HomeSection";
import { cards, ItemAnimation, sections } from "@/lib/constants";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import { useSelector } from "react-redux";
import type { NextPage } from "next";
import { wrapper } from "@/store";
import { setAuthState } from "@/store/slices/AuthSlice";

 const Index:NextPage = () =>{
	return (
		<>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<section className="start flex flex-col gap-4 text-center items-center justify-center py-16 w-screen">
					<div className="container">
						<p className="title1 text-white font-serif text-xl font-semibold">
							Приложение для управления проектами
						</p>
						<p className="title2 text-3xl sm:text-4xl text-white font-semibold font-serif md:text-6xl">
							Сотрудничайте и работайте
							<br /> быстрее вместе.
						</p>
						<p className="desc text-dark2 text-lg font-normal sm:max-w-md max-w-xs text-center mx-auto mb-10">
							Создавайте, делитесь и получайте отзывы с помощью совместных досок
							для быстрой разработки.
						</p>
						<Link
							href=""
							className="text-white px-4 py-1.5 text-lg font-semibold  bg-cyan7 rounded-lg"
						>
							Создать канбан-доску
						</Link>
					</div>
				</section>
				<section
					className="flex flex-col md:flex-row justify-center gap-12 items-center py-14 container px-2"
				>
					{cards.map((el: any, i: number) => {
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
				{sections.map((elem,i) => (
					<HomeSection {...elem} key={i} />
				))}
			</motion.div>
		</>
	);
}


export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ params }) => {
			
			await store.dispatch(setAuthState(false));
			console.log("State on server", store.getState());
			return {
				props: {
					authState: false,
				},
			};
		}
);