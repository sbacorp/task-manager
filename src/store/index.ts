import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserReducer from "./slices/userSlice";
import projectsReducer from "./slices/projectsSlice";
import profileReducer from "./slices/profileSlice";
import storage from "redux-persist/lib/storage";
import projectReducer from './slices/projectSlice'
import columnsReducer from "./slices/columnsSlice";
import tasksReducer from "./slices/tasksSlice";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const persistConfigUser = {
	key: "user",
	storage,
};

const persistConfigProjects = {
	key: "projects",
	storage,
};
const persistConfigProfile = {
	key: "profile",
	storage,
};
export const rootReducer = combineReducers({
	userSlice: persistReducer(persistConfigUser, UserReducer),
	projectsSlice: persistReducer(persistConfigProjects, projectsReducer),
	profileSlice: persistReducer(persistConfigProfile, profileReducer),
	projectReducer: projectReducer,
	columnsReducer: columnsReducer,
	tasksReducer: tasksReducer,
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;