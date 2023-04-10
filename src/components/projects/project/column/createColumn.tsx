import React from "react";
import Editable from "@/components/Editable";
interface ICreateColumn {
	createColumnF: any;
}

function CreateColumn({ createColumnF }: ICreateColumn) {
	const handleAddColumn = (title: string) => {
		createColumnF(title);
	};

	return (
		<div className=" cursor-pointer min-w-80">
			<Editable
				onSave={handleAddColumn}
				text=""
				classes="bg-dark4 whitespace-nowrap min-w-80 "
				defaultValue="Добавить колонку"
			/>
		</div>
	);
}

export default CreateColumn;
