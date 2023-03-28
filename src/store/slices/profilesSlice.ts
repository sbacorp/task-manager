import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard } from '../slices/types';

const initialState = {
  users: [],
  fetching: false,
  status: 'idle',
  error: ''
};