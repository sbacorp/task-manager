import supabase from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {useRouter} from 'next/router';
import useScroll from "@/lib/hooks/use-scroll";
interface IHeader {
	links: any;
}

function Header({ links }: IHeader) {
	const scrolled = useScroll(50);
	const [session, setSession] = useState(null);

	const router = useRouter()
	const checkAuth = async () => {
		const { data } = await supabase.auth.getSession();
		setSession(data.session);
	};

	useEffect(() => {
		checkAuth();
	}, [router]);

	const handleSignOut = async () => {
		let { error } = await supabase.auth.signOut()
		router.push('/')
	}

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
				{!session ? (
					<div className="flex items-center gap-5">
						<Link
							href="/login"
							className="signIn  text-base text-white font-serif"
						>
							Вход
						</Link>
						<Link
							href="/registration"
							className="signUp border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
						>
							Регистрация
						</Link>
					</div>
				) : (
					<button
						onClick={handleSignOut}
						className="signUp border border-solid font-serif border-white px-4 py-2 rounded-lg text-white text-sm"
					>
						Выйти
					</button>
				)}
			</div>
		</header>
	);
}

export default Header;
