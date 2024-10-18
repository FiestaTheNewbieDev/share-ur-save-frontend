import initialState, { IAuthState } from '@/stores/auth/initialState';
import FetchErrorType from '@/types/FetchErrorType';
import IUser from '@/types/IUser';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'auth',
	storage,
};

export const signOutAction = createAction('auth/signOut');

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		startFetching: (state: IAuthState) => {
			state.fetching = true;
			state.fetchError = null;
		},
		fetchSuccess: (
			state: IAuthState,
			action: PayloadAction<{ data: { user: IUser } }>,
		) => {
			state.fetching = false;
			state.user = action.payload.data.user;
		},
		fetchError: (
			state: IAuthState,
			action: PayloadAction<{ error: FetchErrorType }>,
		) => {
			state.fetching = false;
			state.fetchError = action.payload.error;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signOutAction, (state: IAuthState) => {
			return { ...initialState };
		});
	},
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const authSliceActions = authSlice.actions;
export default persistedReducer;
