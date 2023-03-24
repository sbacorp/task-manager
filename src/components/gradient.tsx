import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  classes: string ;
}

function Gradient({classes}:Props) {
  return (
		<motion.div
			className={`absolute -z-10 w-[800px] lg:w-[1000px] ${classes}`}
			animate={{ rotate: 360 }}
			transition={{
				repeat: Infinity,
				duration: 20,
				repeatType: "mirror",
				ease: "linear",
			}}
		>
			<Image
				src="assets/noise.svg"
				alt="gr"
				width={1000}
				height={1500}
				className="absolute top-1/2 left-0"
			/>
		</motion.div>
	);
}

export default Gradient