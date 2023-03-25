import { configureStore, Store } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserReducer from "./slices/userSlice";
import boardsReducer from "./slices/boardsSlice";
import storage from "redux-persist/lib/storage";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const persistConfig = {
	key: "root",
	version:1,
	storage,
	
};


 
const persistedReducer = persistReducer(persistConfig, UserReducer);
const persistedReducer2 = persistReducer(persistConfig, boardsReducer);
export const store = configureStore({
	reducer: {
		userSlice: persistedReducer,
		boardsSlice: persistedReducer2,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector