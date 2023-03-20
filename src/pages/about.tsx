import Image from "next/image"
import AboutCard from "@/components/aboutCard"
import { aboutCards } from "@/lib/constants"

function About() {
    return (
        <div className="flex min-h-screen flex-col gap-5 items-center overflow-hidden bg-black py-6 sm:py-12">
            <h2 className="mx-auto text-white text-4xl font-bold font-sans mb-5">About Project</h2>
            {aboutCards.map(item => <AboutCard {...item} />)}
            <div className="flex flex-col items-center justify-center gap-5 mt-5">
                <p className="text-xs font-normal text-dark3">Build with</p>
                <div className="flex space-x-16">
                    <Image src='/assets/react.png' width={20} height={20} alt='react' />
                    <Image src='/assets/redux.png' width={20} height={20} alt='redux' />
                    <Image src='/assets/ts.png' width={20} height={20} alt='ts' />
                </div>
            </div>
        </div>

    )
}

export default About