export const FADE_IN_ANIMATION_SETTINGS = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 1 },
};
export const FADE_IN_ANIMATION_SETTINGS1 = {
	initial: { opacity: 0 },
	animate: { opacity: 0.95 },
	transition: { duration: 0.5 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: -10 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring" },
	},
};

export const FADE_UP_ANIMATION_VARIANTS = {
	hidden: { opacity: 0, y: 10 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring" },
	},
};
export const ItemAnimation = {
	hidden: {
		y: 400,
		opacity: 0,
	},
	visible: (custom: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			delay: custom * 0.3,
			type: "tween",
			duration: 0.7,
		},
	}),
};
export const ItemAnimation2 = {
	hidden: {
		x: 200,
		opacity: 0,
	},
	visible: (custom: number) => ({
		x: 0,
		opacity: 1,
		transition: {
			delay: custom * 0.3,
			type: "tween",
			duration: 0.7,
		},
	}),
};
export const ItemAnimation3 = {
	hidden: {
		x: -200,
		opacity: 0,
	},
	visible: (custom: number) => ({
		x: 0,
		opacity: 1,
		transition: {
			delay: custom * 0.3,
			type: "tween",
			duration: 0.7,
		},
	}),
};

export const aboutCards = [
	{
		name: "Bogdan Shankin",
		desc: "Made design, api requests, statistics, sprint game, made some typesetting and supervised the development.",
		working: {
			design: "DESIGN",
			api: "API",
			features: "FEATURES",
		},
		transform: false,
	},
	{
		name: "Rustem Sadykov",
		desc: "Made the main page of the application, an electronic textbook, layout and adaptive.",
		working: {
			markup: "MARKUP",
			router: "ROUTER",
			features: "FEATURES",
		},
		transform: true,
	},
];

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

export const notAuthLinks = [{ title: "О проекте", href: "about" }];
export const authLinks = [
	{ title: "Проекты", href: "projects" },
	{ title: "Профиль", href: "account" },
	{ title: "Поиск", href: "search" },
	{ title: "О проекте", href: "about" },
];
