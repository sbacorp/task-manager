import Image from "next/image"
import { AboutProps } from "../../typings"

function AboutCard({ name, desc, working, transform }: AboutProps) {
    return (
        <div className={`rounded-lg w-72 h-48 sm:w-[488px] flex-shrink-0 flex flex-col md:gap-5 gap-3 md:py-10 py-6 px-5 items-start text-white ${transform ? 'aboutCard' : 'reverseAboutCard'}`}
        >
            <div className="w-full flex flex-row justify-between items-center">
                <h2 className="text-base md:text-lg font-semibold ">
                    {name}
                </h2>
                <Image src='/assets/vector.png' alt='vector' width={18} height={14} />
            </div>
            <div className="w-full flex gap-1 justify-start">
                <div className="flex items-center justify-center text-[11px] font-bold bg-[#4C6EF5] rounded-md py-[1px] px-2">{working.design || working.router}</div>
                <div className="flex items-center justify-center text-[11px] font-bold bg-[#12B886] rounded-md py-[1px] px-2">{working.api || working.markup}</div>
                <div className="flex items-center justify-center text-[11px] font-bold bg-[#FD7E14] rounded-md py-[1px] px-2">{working.features}</div>
            </div>
            <p className="text-base font-normal text-[#909296]">{desc}</p>
        </div>
    )
}

export default AboutCard