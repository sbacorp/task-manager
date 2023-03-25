import { IBoard } from '@/store/slices/types';
import Link from 'next/link';
import React from 'react'

function ProjectsItem({ board }:{board:IBoard}) {
	return (
		<div className="flex flex-col gap items-center text-center relative justify-start w-72 h-72 bg-[#320606] py-10 px-3 border rounded-xl border-solid border-red6 gap-4">
			<svg
				fill="#868E96"
				className="absolute right-4 top-4 cursor-pointer"
				viewBox="0 0 22 22"
				height="20"
				width="20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
			</svg>
			<p className="text-xl font-semibold capitalize">title</p>
			<p className="text-base text-dark2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, earum. ads
				bored times ago
			</p>
			<div className="buttons flex gap-2 pt-4">
				<Link
					href="#"
					className="edit text-base rounded px-4 py-2 bg-dark6 hover:bg-dark4 transition-all duration-300"
				>
					Открыть
				</Link>
				<button className="edit text-base rounded px-4 py-2 bg-dark6 hover:bg-dark4 transition-all duration-300">
					{" "}
					edit
				</button>
			</div>
		</div>
	);
}

export default ProjectsItem