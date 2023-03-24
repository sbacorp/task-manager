import { authLinks, notAuthLinks } from '@/lib/constants';
import Link from 'next/link'
import { useSelector } from "react-redux";

function NavLinks() {
    const user = useSelector((state) => state.user.user);
    
	
  return (
		<nav className="links flex">
			<ul className="list-none flex gap-10">
				{user ? (
					<>
						{authLinks.map((el: any, i: number) => (
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
					notAuthLinks.map((el: any, i: number) => (
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
				<li className="text-dark2 font-semibold text-base">English</li>
			</ul>
		</nav>
	);
}

export default NavLinks