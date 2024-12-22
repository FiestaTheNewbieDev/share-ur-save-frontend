import initialState, { UserState } from '@/store/user/initialState';
import { User } from '@/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<{ user: User }>) => {
			state.user = action.payload.user;
		},
		clearUser: (state: UserState) => {
			state.user = null;
		},
	},
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
