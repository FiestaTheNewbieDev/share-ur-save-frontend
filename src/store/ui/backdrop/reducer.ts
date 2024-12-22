import initialState, { BackdropState } from '@/store/ui/backdrop/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const backdropSlice = createSlice({
	name: 'backdrop',
	initialState: initialState,
	reducers: {
		push: (state: BackdropState, action: PayloadAction<{ id: string }>) => {
			state.stack.push({
				id: action.payload.id,
				zIndex:
					state.stack.length > 0
						? state.stack[state.stack.length - 1].zIndex + 10
						: 100,
			});
		},
		pop: (state: BackdropState) => {
			state.stack.pop();
		},
		remove: (
			state: BackdropState,
			action: PayloadAction<{ id: string }>,
		) => {
			state.stack = state.stack.filter(
				(item) => item.id !== action.payload.id,
			);
		},
	},
});

export const backdropSliceActions = backdropSlice.actions;

export default backdropSlice.reducer;
