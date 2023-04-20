import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { IUserSliceState } from "./types";



const initialState: IUserSliceState = {
	user: null,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	}
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
