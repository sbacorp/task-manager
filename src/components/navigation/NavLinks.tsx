import { authLinks, notAuthLinks } from "@/lib/constants";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import HamburgerMenu from "./DropdownMenu";
import { ILink } from "../../../typings";

function NavLinks({
	children,
	setIsOpen,
}: {
	children: ReactNode;
	setIsOpen: (_: boolean) => void;
}) {
	const user = useAppSelector((state) => state.userSlice.user);
	const [size, setSize] = useState<number>(1024);
	useEffect(() => {
		if (window) {
			setSize(window.innerWidth);
		}
	}, []);
	if (size <= 1024)
		return (
			<div>
				<HamburgerMenu user={user} setIsOpen={setIsOpen} />
			</div>
		);

	return (
		<nav className="links flex">
			<ul className="list-none sm:flex gap-10">
				{user ? (
					<>
						{children}
						{authLinks.map((el: ILink, i: number) => (
							<li key={i}>
								<Link
									href={`/${el.href}`}
									className="text-dark2 font-semibold font-serif text-base"
								>
									{el.title}
								</Link>
							</li>
						))}
					</>
				) : (
					notAuthLinks.map((el: ILink, i: number) => (
						<li key={i}>
							<Link
								href={`/${el.href}`}
								className="text-dark2 font-semibold font-serif text-base"
							>
								{el.title}
							</Link>
						</li>
					))
				)}
			</ul>
		</nav>
	);
}

export default NavLinks;
