import Image from "next/image"
import { HomeProps } from "../../typings"



function HomeSection({tag, title, desc, imgPath, order}: HomeProps) {
  return (
    <section className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center py-12 container px-2">
				<div className="">
					<div className="tag flex gap-2">
						<Image
							src="assets/okIcon.svg"
							alt="ok"
							width={20}
							height={20}
							className="order-first md:order-last"
						/>
						<p className="text-semibold text-base leading-tight">
							{tag}
						</p>
					</div>
					<p className="title text-3xl md:text-42 font-serif font-bold">
						{title}
					</p>
					<p className="desc text-lg font-normal text-dark1 block">
						{desc}
					</p>
				</div>
				<Image
					src={imgPath}
					alt="projectsPreviewImg"
					width={640}
					height={420}
					className={`${order} order-first md:w-96 md:h-auto xl:w-[640px] flex-shrink`}
				/>
			</section>
  )
}

export default HomeSection