import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { authLinks } from '@/lib/constants';
import Link from 'next/link';

const HamburgerMenu = ({
  setIsOpen,
}: {
  setIsOpen: any;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="rounded-full w-[48px] h-[48px] inline-flex items-center justify-center text-violet11 bg-black outline-none hover:bg-dark8 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon className="w-10 h-10" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-44 flex flex-col gap-3 bg-dark9 rounded-md p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={() => setIsOpen(true)}
            className="group text-2xl leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-dark7 data-[highlighted]:text-white active:bg-dark7"
          >
            Профиль
          </DropdownMenu.Item>
          {authLinks.map((el) => (
            <Link href={`/${el.href}`}>
              <DropdownMenu.Item className="group text-2xl leading-none text-white rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-dark7 data-[highlighted]:text-white active:bg-dark7">
                {el.title}
              </DropdownMenu.Item>
            </Link>
          ))}
          <DropdownMenu.Arrow className="fill-dark9" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default HamburgerMenu;
