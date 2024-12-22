import { GenericState } from '@/store/generic/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState, { GameState } from '@store/game/initialState';
import { Game } from 'share-ur-save-common';

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setGame: (
			state: GenericState<GameState>,
			action: PayloadAction<{ game: Game }>,
		) => {
			state.data.game = action.payload.game;
		},
	},
});

export const gameSliceActions = gameSlice.actions;

export default gameSlice.reducer;
