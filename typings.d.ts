export interface HomeProps {
	tag: string;
	title: string;
	desc: string;
	imgPath: string;
	order: string;
}

export interface AboutProps {
	name: string;
	desc: string;
	working: IWorking;
	transform: boolean;
}

interface IWorking {
	features: string;
	markup?: string;
	design?: string;
	router?: string;
	api?: string;
}

export interface ProfileProps {
	setIsOpen: (boolean) => boolean;
}

export interface HeaderNavProps {
	isOpen: boolean;
	setIsOpen: (boolean) => void;
}

export type LoginType = "signin" | "reset";

export type EyeActive = [true, "text"] | [false, "password"];

export interface ILink {
	title: string;
	href: string;
}

export interface ICreateColumn {
	createColumnF: (title: string) => void;
}

interface ICard {
	src: string;
	title: string;
	desc: string;
}
