import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { CheckIcon } from "@radix-ui/react-icons";
import { Cross2Icon } from "@radix-ui/react-icons";
interface IEditable {
	text: string;
	onSave: (text: string) => void;
	defaultValue?: string;
	classes?: string;
}

const Editable: React.FC<IEditable> = ({
	text,
	onSave,
	defaultValue,
	classes,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState(text);
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.keyCode === 13 && isEditing && newText.length) {
				// save on enter
				onSave(newText);
				setIsEditing(false);
			} else if (event.keyCode === 27 && isEditing) {
				// cancel on esc
				setIsEditing(false);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isEditing, newText, onSave]);
	useEffect(() => {
		if (isEditing) {
			const input = document.querySelector("input") as HTMLInputElement;
			input.select();
		}
	}, [isEditing]);
	const handleSave = () => {
		if (!newText.length) {
			onSave("Добавьте title");
			setIsEditing(false);
		} else {
			onSave(newText);
			setIsEditing(false);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};
	return (
		<div className=" bg-transparent rounded py-2 w-full">
			{isEditing ? (
				<AnimatePresence>
					<motion.div
						className="flex flex-grow-0 w-full min-w-[150px] gap-1 flex-shrink-0"
						{...FADE_IN_ANIMATION_SETTINGS}
					>
						<input
							className="flex-shrink-0 w-1/2 bg-transparent border rounded p-2 text-white text-md hover:bg-white/30 flex-grow-0 focus:bg-white/30"
							value={newText}
							onChange={(e) => setNewText(e.target.value)}
						/>
						<button
							className=" border-2 bg-green border-solid border-green text-white p-2 rounded hover:bg-transparent transition-all duration-200"
							onClick={() => handleSave()}
						>
							<CheckIcon />
						</button>
						<button
							className="  border-2 bg-purple border-solid border-purple text-white p-2 rounded hover:bg-transparent transition-all duration-200"
							onClick={handleCancel}
						>
							<Cross2Icon />
						</button>
					</motion.div>
				</AnimatePresence>
			) : (
				<p
					className={`cursor-pointer md:text-xl text-center text-white w-fit hover:bg-dark6 focus:bg-dark7 p-2 rounded ${classes} transition-all duration-300`}
					onClick={() => setIsEditing(true)}
				>
					{text || defaultValue || "Enter Text"}
				</p>
			)}
		</div>
	);
};

export default Editable;
