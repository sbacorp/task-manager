export const FADE_IN_ANIMATION_SETTINGS = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	transition: { duration: 0.5 },
};
export const FADE_IN_ANIMATION_SETTINGS1 = {
	initial: { opacity: 0 },
	animate: { opacity: 0.95 },
	transition: { duration: 0.5 },
};
export const FADE_IN_ANIMATION_SETTINGS3 = {
	initial: { x: 600, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	transition: { duration: 0.5, type: "spring" },
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
		desc: "Made design, api requests, statistics, made some typesetting and supervised the development,boards functionality, auth.",
		working: {
			design: "DESIGN",
			api: "API",
			features: "FEATURES",
		},
		transform: false,
	},
	{
		name: "Rustem Sadykov",
		desc: "Made the main page of the application, layout and adaptive.",
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
		title: "Integration",
		desc: "The ability to quickly set up and customize workflows for almost anything.",
	},
	{
		src: "assets/colaborateIcon.svg",
		title: "Collaborative work",
		desc: "Manage projects, organize tasks and develop team spirit all in one place.",
	},
	{
		src: "assets/succeedIcon.svg",
		title: "Achieving goals",
		desc: "Every part of your task can be managed, tracked, and shared with your teammates.",
	},
];
export const sections = [
	{
		tag: "Versatility",
		title: "Create the desired workflow",
		desc: "Manage your boards with Drag-n-Drop, create additional boards and tasks.",
		imgPath: "assets/projectsImg.svg",
		order: "md:order-last",
	},
	{
		tag: "Optimization",
		title: "Everything you need in one place",
		desc: "You can specify additional info in task description and assign users.",
		imgPath: "assets/optimazedImg.svg",
		order: "order-first",
	},
	{
		tag: "No limits",
		title: "No limits for all users.",
		desc: "Unlimited kanban boards, columns and tasks.",
		imgPath: "assets/unlimitedImg.svg",
		order: "md:order-last",
	},
];

export const notAuthLinks = [{ title: "About project", href: "about" }];
export const authLinks = [
	{ title: "Projects", href: "projects" },
	{ title: "About project", href: "about" },
];
