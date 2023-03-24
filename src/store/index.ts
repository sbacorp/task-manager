import { configureStore, Middleware, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userSlice from "./slices/userSlice";

const rootReducer = {
	user: userSlice.reducer,
};

const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ thunk: false }) as Middleware[],
		devTools: process.env.NODE_ENV !== "production",
	});
};

export const store: Store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
const wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV === "development",
});

export default wrapper;
