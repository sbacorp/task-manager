// import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/router';
import useScroll from "@/lib/hooks/use-scroll";
import AuthButtons from "./AuthButtons";
interface IHeader {
	links: any;
}

function Header({ links }: IHeader) {
	const scrolled = useScroll(50);
	return (
		<header
			className={`fixed w-full top-0 ${
				scrolled
					? "border-b border-dark6 bg-black/50 backdrop-blur-xl"
					: "bg-black"
			} z-30 transition-all`}
		>
			<div className="container h-16 flex justify-between items-center gap-2 py-2">
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
				<nav className="links">
					<ul>
						{links.map((el: any, i: number) => (
							<li key={i}>
								<Link
									href={`/${el.href}`}
									className="text-dark2 font-semibold font-serif text-base"
								>
									{el.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			<AuthButtons/>
			</div>
		</header>
	);
}

export default Header;
