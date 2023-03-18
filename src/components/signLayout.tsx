import { ReactNode } from "react";

function SignLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex gap-10 flex-col lg:flex-row items-center">
			<div className="about flex flex-col gap-5 max-w-md text-white font-serif">
				<div className="title flex gap-1">
					<svg
					className=" -translate-y-1 border rounded-full border-cyan5"
						width="25"
						height="25"
						viewBox="0 0 15 15"
						fill="#22B8CF"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
							fill="#22B8CF"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-semibold text-base leading-tight">
						Приложение для управления проектами
					</p>
				</div>
				<div className="title-2nd text-42 font-serif font-bold">
					Все, что вам нужно, в одном месте
				</div>
				<p className="desc text-lg font-normal text-dark1 hidden md:block">
					Управляйте своими досками с помощью
					<br /> Drag-n-Drop, создавайте дополнительные доски и задачи.
				</p>
			</div>
			<div className="w-80 md:w-464 form-contaier rounded-xl bg-dark9 px-2 py-6 md:px-10 md:py-16">
				{children}
			</div>
		</div>
	);
}

export default SignLayout;
