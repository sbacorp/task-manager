import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tasks:[]
}

const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
	
  }
});

export const {} = tasksSlice.actions

export default tasksSlice.reducer