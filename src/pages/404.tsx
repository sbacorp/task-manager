import Gradient from "@/components/gradient";
import Link from "next/link"

function NotFound() {
  return (
		<div className=" min-h-full font-sans relative w-full">
			<Gradient classes={`right-1/2 md:right-3/4 -top-40`} />
			<div className="mx-auto max-w-md">
				<div className="space-y-6 flex flex-col items-center text-center">
					<p className="text-4xl text-white font-semibold">
						Извините! Страница не найдена
					</p>

					<p className="text-sm text-[#909296] font-normal ">
						Перейдите на главную страницу или воспользуйтесь поиском, чтобы
						найти то, что вы ищете.
					</p>
					<Link
						href="/"
						className=" text-white px-4 py-1.5 text-lg font-semibold  bg-[#1098AD] rounded-lg"
					>
						На главную страницу
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFound