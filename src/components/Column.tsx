import { useAppDispatch } from '@/store';
import { IColumn } from '@/store/slices/types'
import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react'
import Editable from './Editable'

function Column({column}:{column:IColumn}) {
	const dispatch = useAppDispatch();
	const editTitleFn = ()=>{

	}
  return (
		<div className="bg-dark6 rounded border relative border-solid border-dark2 p-5 w-72 overflow-hidden">
			<Cross2Icon className='absolute right-3 top-3 w-6 h-6'/>
			<Editable text={column.title} onSave={editTitleFn} classes=''/>
		</div>
	);
}

export default Column