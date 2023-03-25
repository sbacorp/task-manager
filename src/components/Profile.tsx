import { useState } from "react";
import Image from 'next/image'
import { ProfileProps } from "../../typings"

function Profile() {
    const [searchInput, setSearchInput] = useState<string>('')
    const haveTasks = true;
    const tasks = ['Brochure products', 'Treatment', 'Windexing mirrors', 'Quarterly report tasklist']
    return (
        <div className="absolute right-0 w-[480px] h-full flex flex-col gap-2 rounded shadow-xl border border-[#343A40] bg-dark9 z-50">
            <div className="w-full h-[120px] bg-cyan5 rounded-sm pr-2 pt-2">
                <div className="flex justify-end cursor-pointer">X</div>
            </div>
            <div className="relative w-full">
                <div className="absolute -top-12 left-[40px] rounded-full w-[100px] h-[100px] bg-dark" />
                <div className="absolute top-0.5 left-[164px] flex flex-col gap-1 w-fit">
                    <h2 className="whitespace-nowrap">Alexander Familia</h2>
                    <p className="whitespace-nowrap">ID: hdciy3tfdhbt8</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-14">
                <div className="flex space-x-10">
                    <button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">Редактировать</button>
                    <button className="bg-dark6 py-[10px] px-[22px] font-semibold text-base text-white rounded-lg">Изменить аватар</button>
                </div>
                <div className="flex flex-col gap-[16px] mt-10 justify-center items-center">
                    <h2 className="font-bold text-lg text-dark2">Ваши задачи</h2>
                    {haveTasks ?
                        <div className="rounded-lg relative">
                            <input placeholder="Поиск задачи..." type='text' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className='block w-full bg-dark9 py-[9.5px] px-[14px] border border-dark2 rounded-lg lg:w-[408px]' />
                            <Image src='/assets/search.svg' alt='search' width={16} height={16} />
                        </div> :
                        <p className="text-sm text-dark2 font-normal">У вас нет назначенных задач</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile