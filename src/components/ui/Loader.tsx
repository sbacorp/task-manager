import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({classes}:{classes:string}) => {
	const spinnerVariants = {
		rotate: {
			rotate: [0, 360],
			transition: {
				duration: 1,
				repeat: Infinity,
			},
		},
	};

	return (
		<motion.div
			className={`w-8 h-8 border-t-4  border-blue5 border-solid rounded-full animate-spin ${classes}`}
			variants={spinnerVariants}
			animate="rotate"
		/>
	);
};

export default LoadingSpinner;
