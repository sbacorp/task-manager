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
				src="assets/gradient.svg"
				alt="gr"
				width={1000}
				height={1000}
			/>
		</motion.div>
	);
}

export default Gradient