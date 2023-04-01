// components/PyramidLoader.tsx

import React from "react";
import { motion } from "framer-motion";

const PyramidLoader = () => {
	const circleVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const transition = {
		duration: 0.5,
		repeat: Infinity,
		repeatType: "reverse" as const,
		delay: (i: number) => i * 0.2,
	};
	const circles = [
		{ key: 1, row: 1, col: 1 },
		{ key: 2, row: 2, col: 1 },
		{ key: 3, row: 2, col: 2 },
		{ key: 4, row: 3, col: 1 },
		{ key: 5, row: 3, col: 2 },
		{ key: 6, row: 3, col: 3 },
	];

	return (
		<div className="flex flex-col items-start relative justify-center space-y-1">
			{circles.map(({ key, row, col }) => (
				<motion.svg
					key={key}
					className={`absolute`}
					style={{ left: `${(col - 1)}rem`, top: `${(row - 1)}rem` }}
					variants={circleVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					transition={{ ...transition, delay: transition.delay(row + col - 2) }}
					width="14"
					height="14"
					viewBox="0 0 14 14"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="6.64005"
						cy="6.63999"
						r="5.9"
						fill="#50ADBB"
						fillOpacity="0.9"
						stroke="black"
					/>
				</motion.svg>
			))}
		</div>
	);
};

export default PyramidLoader;
