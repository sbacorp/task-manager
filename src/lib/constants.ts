export const FADE_IN_ANIMATION_SETTINGS = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.5 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: -10 },
	show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { type: "spring" } },
};


export const cards = [
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
export const sections = [
	{
		tag: "Универсальность",
		title: "Создайте желаемый рабочий процесс",
		desc: "Управляйте своими досками с помощью Drag-n-Drop, создавайтедополнительные доски и задачи.",
		imgPath: "assets/projectsImg.svg",
		order: "md:order-last",
	},
	{
		tag: "Оптимизация",
		title: "Все, что вам нужно, в одном месте",
		desc: "Вы можете указать дополнительную информацию в описании задачи иназначить пользователей.",
		imgPath: "assets/optimazedImg.svg",
		order: "order-first",
	},
	{
		tag: "Без ограничений",
		title: "Без ограничений для всех пользователей.",
		desc: "Неограниченное количество канбан-досок, колонок и задач.",
		imgPath: "assets/unlimitedImg.svg",
		order: "md:order-last",
	},
];