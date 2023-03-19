import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const cards = [
		{
			src: "assets/integrateIcon.svg",
			title: "Интеграция",
			desc: "Возможность быстро настраивать и настраивать рабочие процессы практически для чего угодно.",
		},
		{
			src: "assets/colaborateIcon.svg",
			title: "Совместная работа",
			desc: "Управляйте проектами, организуйте задачи и развивайте командный дух — все в одном месте.",
		},
		{
			src: "assets/succeedIcon.svg",
			title: "Достижение целей",
			desc: "Каждой частью вашей задачи можно управлять, отслеживать и делиться ею с товарищами по команде.",
		},
	];
	return (
		<>
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

			<section className="flex flex-col md:flex-row justify-center gap-12 items-center py-12 container px-2">
				{cards.map((el: any, i: number) => {
					return (
						<div className=" card w-full md:w-60 lg:w-80 h-60 md:h-80 flex-shrink-0 md flex flex-col md:gap-7 gap-2 md:py-12 py-6 px-5 bg-gray-600 items-center text-center text-white bg-dark">
							<Image src={el.src} alt={el.title} width={40} height={40} />
							<h2 className="text-base md:text-lg font-semibold">{el.title}</h2>
							<p className="sm:text-base font-normal">{el.desc}</p>
						</div>
					);
				})}
			</section>
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
							Универсальность
						</p>
					</div>
					<p className="title text-3xl md:text-42 font-serif font-bold">
						Создайте желаемый рабочий процесс
					</p>
					<p className="desc text-lg font-normal text-dark1 hidden md:block">
						Управляйте своими досками с помощью Drag-n-Drop, создавайте
						дополнительные доски и задачи.
					</p>
				</div>
				<Image
					src="assets/projectsImg.svg"
					alt="projectsPreviewImg"
					width={640}
					height={420}
					className=" order-last"
				/>
			</section>
			<section className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center py-12 container px-2">
				<div className="">
					<div className="tag flex gap-2">
						<Image src="assets/okIcon.svg" alt="ok" width={20} height={20} />
						<p className="text-semibold text-base leading-tight">Оптимизация</p>
					</div>
					<p className="title text-3xl md:text-42 font-serif font-bold">
						Все, что вам нужно, в одном месте
					</p>
					<p className="desc text-lg font-normal text-dark1 hidden md:block">
						Вы можете указать дополнительную информацию в описании задачи и
						назначить пользователей.
					</p>
				</div>
				<Image
					src="assets/optimazedImg.svg"
					alt="optimazedImg"
					width={640}
					height={420}
					className=" order-last md:order-first"
				/>
			</section>
			<section className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center py-12 container px-2">
				<div className="">
					<div className="tag flex gap-2">
						<Image src="assets/okIcon.svg" alt="ok" width={20} height={20} />
						<p className="text-semibold text-base leading-tight">
							Без ограничений
						</p>
					</div>
					<p className="title text-3xl md:text-42 font-serif font-bold">
						Без ограничений для всех пользователей.
					</p>
					<p className="desc text-lg font-normal text-dark1 hidden ">
						Неограниченное количество канбан-досок, колонок и задач.
					</p>
				</div>
				<Image
					src="assets/unlimitedImg.svg"
					alt="unlimitedImg"
					width={640}
					height={420}
					className="order-last"
				/>
			</section>
		</>
	);
}
