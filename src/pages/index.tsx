import Image from "next/image";
import Link from "next/link";
import HomeSection from "@/components/HomeSection";

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
	const sections = [
		{tag: 'Универсальность', title: 'Создайте желаемый рабочий процесс', desc: 'Управляйте своими досками с помощью Drag-n-Drop, создавайтедополнительные доски и задачи.', imgPath: 'assets/projectsImg.svg', order: 'order-last'},
		{tag: 'Оптимизация', title: 'Все, что вам нужно, в одном месте', desc: 'Вы можете указать дополнительную информацию в описании задачи иназначить пользователей.', imgPath: 'assets/optimazedImg.svg', order: 'order-first'},
		{tag: 'Без ограничений', title: 'Без ограничений для всех пользователей.', desc: 'Неограниченное количество канбан-досок, колонок и задач.', imgPath: 'assets/unlimitedImg.svg', order: 'order-last'}
	]
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
			{sections.map(elem => <HomeSection {...elem}/>)}
		</>
	);
}
