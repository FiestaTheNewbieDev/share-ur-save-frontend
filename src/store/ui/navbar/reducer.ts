import initialState, { NavbarState } from '@/store/ui/navbar/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
	name: 'navbar',
	initialState: initialState,
	reducers: {
		setNavOpen: (
			state: NavbarState,
			action: PayloadAction<{ isOpen: boolean }>,
		) => {
			state.isOpen = action.payload.isOpen;
		},
		toggleNavbar: (state: NavbarState) => {
			state.isOpen = !state.isOpen;
		},
	},
});

export const navbarSliceActions = navbarSlice.actions;

export default navbarSlice.reducer;
