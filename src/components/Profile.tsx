import { store } from "@/store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ProfileProps } from "../../typings"
import Search from "./Search";

function Profile({ setIsOpen }: ProfileProps) {
    const user = store.getState().userSlice.user;

    const [searchInput, setSearchInput] = useState<string>('')
    const haveTasks = false;
    const tasks = ['Brochure products', 'Treatment', 'Windexing mirrors', 'Quarterly report tasklist']
    return (
			<div className="absolute  right-0 w-[480px] h-full flex flex-col gap-2 rounded shadow-xl border border-[#343A40] bg-dark9 z-50">
				<div className="w-full h-[120px] bg-cyan5 rounded-sm pr-2 pt-2">
					<button
						className=" rounded-full h-7 w-7 bg-dark7 text-cyan5 inline-flex items-center justify-center absolute top-3 right-3 border border-solid hover:bg-cyan5 hover:text-black duration-300 transition-all"
						aria-label="Close"
						onClick={() => setIsOpen(false)}
					>
						<Cross2Icon />
					</button>
				</div>
				<div className="relative w-full">
					<div className="absolute -top-12 left-[40px] rounded-full w-[100px] h-[100px] bg-dark" />
					<div className="absolute top-0.5 left-[164px] flex flex-col gap-3 w-fit">
						<h2 className="whitespace-nowrap">{user?.email}</h2>
						<p className="whitespace-nowrap">ID: {user?.id}</p>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center mt-14">
					<div className="flex gap-6 mt-8 justify-evenly w-full">
						<button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
							Редактировать
						</button>
						<button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">
							Изменить аватар
						</button>
					</div>
					<div className="flex flex-col gap-[16px] mt-10 justify-center items-center">
						<h2 className="font-bold text-lg text-dark2">Ваши задачи</h2>
						{haveTasks ? (
							<div className="rounded-lg relative ">
								<Search value={searchInput} setValue={setSearchInput} />
							</div>
						) : (
							<p className="text-sm text-dark2 font-normal">
								У вас нет назначенных задач
							</p>
						)}
					</div>
				</div>
			</div>
		);
}

export default Profile