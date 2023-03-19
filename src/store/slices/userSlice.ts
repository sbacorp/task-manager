import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";
import { HYDRATE } from "next-redux-wrapper";

interface UserState {
	user: User | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
	name: "user",
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
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			(action): action is PayloadAction<any> => action.type === HYDRATE,
			(state, action) => {
				if (action.payload.user) {
					state.user = action.payload.user;
				}
			}
		);
	},
});

export const { setUser, setLoading, setError } = userSlice.actions;

export default userSlice;
