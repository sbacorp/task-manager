import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { authLinks, notAuthLinks } from "@/lib/constants";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

const HamburgerMenu = ({
	setIsOpen,
	user,
}: {
	setIsOpen: (isOpen: boolean) => void;
	user: User | null;
}) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<HamburgerMenuIcon className="w-10 h-10" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className=" w-44 flex flex-col gap-3 items-center bg-dark9 rounded-md p-2"
					sideOffset={10}
				>
					<DropdownMenu.Item
						onClick={() => setIsOpen(true)}
						className="group text-2xl  text-white rounded flex items-center py-2 px-1 relative data-[disabled]:pointer-events-none data-[highlighted]:bg-dark7  active:bg-dark7"
					>
						Profile
					</DropdownMenu.Item>
					{user
						? authLinks.map((el, i) => (
								<Link key={i} href={`/${el.href}`}>
									<DropdownMenu.Item className="  group text-2xl text-white rounded py-2 flex items-center px-2 relative select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-dark7 data-[highlighted]:text-white active:bg-dark7">
										{el.title}
									</DropdownMenu.Item>
								</Link>
					))
						: notAuthLinks.map((el, i) => (
								<Link key={i} href={`/${el.href}`}>
									<DropdownMenu.Item className="  group text-2xl text-white rounded py-2 flex items-center px-2 relative select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-dark7 data-[highlighted]:text-white active:bg-dark7">
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
