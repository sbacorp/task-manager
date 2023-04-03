import Image from 'next/image';
import Link from 'next/link';
import useScroll from '@/lib/hooks/use-scroll';
import AuthButtons from './AuthButtons';
import NavLinks from './NavLinks';
import Profile from './Profile';
import { useState } from 'react';
import { HeaderNavProps } from '../../typings';

function Header({
  isOpen,
  setIsOpen,
}: HeaderNavProps) {
  const scrolled = useScroll(50);
  return (
    <header
      className={`fixed w-full top-0 ${
        scrolled
          ? 'border-b border-dark6 bg-black/50 backdrop-blur-xl'
          : 'bg-black border-b border-dark6'
      } z-30 transition-all`}
    >
      <div className="container h-16 flex justify-between items-center gap-2 py-2 ">
        <Link href="/">
          <div className="logo flex items-center gap-2 ">
            <Image
              src="/assets/logo.png"
              alt="Picture of the author"
              width={28}
              height={28}
            />
            <p className="hidden md:block font-sans font-semibold text-gray0 text-center text-xl leading-tight">
              RollingProject
            </p>
          </div>
        </Link>
        <NavLinks setIsOpen={setIsOpen}>
          <li
            onClick={() => setIsOpen(!isOpen)}
            className="text-dark2 font-semibold font-serif text-base cursor-pointer"
          >
            Профиль
          </li>
        </NavLinks>
        <AuthButtons />
      </div>
    </header>
  );
}

export default Header;
