import { authLinks, notAuthLinks } from '@/lib/constants';
import { useAppSelector } from '@/store';
import Link from 'next/link'
import { HeaderNavProps } from '../../typings';

function NavLinks({ isOpen, setIsOpen }: HeaderNavProps) {
	const user = useAppSelector(state => state.userSlice.user)
	return (
		<nav className="links flex">
			<ul className="list-none flex gap-10">
				{user ? (
					<>
						<li onClick={() => setIsOpen(!isOpen)} className="text-dark2 font-semibold font-serif text-base cursor-pointer">Профиль</li>
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