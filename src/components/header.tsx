// import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import useScroll from "@/lib/hooks/use-scroll";
import AuthButtons from "./AuthButtons";
import NavLinks from "./NavLinks";
import { HeaderNavProps } from "../../typings";
import Profile from "./Profile";
import { useState } from "react";

function Header() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const scrolled = useScroll(50);
	return (
		<header
			className={`fixed w-full top-0 ${scrolled
				? "border-b border-dark6 bg-black/50 backdrop-blur-xl"
				: "bg-black border-b border-dark6"
				} z-30 transition-all`}
		>
			{isOpen && <Profile setIsOpen={setIsOpen} />}
			<div className="container h-16 flex justify-between items-center gap-2 py-2 ">
				<Link href="/">
					<div className="logo flex items-center gap-2 ">
						<Image
							src="/assets/logo.png"
							alt="Picture of the author"
							width={28}
							height={28}
						/>
						<p className=" font-sans font-semibold text-gray0 text-center text-xl leading-tight">
							RollingBoard
						</p>
					</div>
				</Link>
				<NavLinks setIsOpen={setIsOpen} isOpen={isOpen} />
				<AuthButtons />
			</div>
		</header>
	);
}

export default Header;
