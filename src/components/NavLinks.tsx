import {
  authLinks,
  notAuthLinks,
} from '@/lib/constants';
import { useAppSelector } from '@/store';
import Link from 'next/link';
import {
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import HamburgerMenu from './DropdownMenu';

function NavLinks({
  children,
  setIsOpen,
}: {
  children: ReactNode;
  setIsOpen: any;
}) {
  const user = useAppSelector(
    (state) => state.userSlice.user
  );
  const [size, setSize] = useState<number>(1024);
  useEffect(() => {
    if (window) {
      setSize(window.innerWidth);
      console.log(window.innerWidth);
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
            {authLinks.map(
              (el: any, i: number) => (
                <li key={i}>
                  <Link
                    href={`/${el.href}`}
                    className="text-dark2 font-semibold font-serif text-base"
                  >
                    {el.title}
                  </Link>
                </li>
              )
            )}
          </>
        ) : (
          notAuthLinks.map(
            (el: any, i: number) => (
              <li key={i}>
                <Link
                  href={`/${el.href}`}
                  className="text-dark2 font-semibold font-serif text-base"
                >
                  {el.title}
                </Link>
              </li>
            )
          )
        )}
        <li className="text-dark2 font-semibold text-base">
          English
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;
