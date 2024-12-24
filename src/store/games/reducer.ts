import { FetchError } from '@/store/generic/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState, { GamesState } from '@store/games/initialState';
import { CombinedGame } from 'share-ur-save-common';

export const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		startFetchingGame: (
			state: GamesState,
			action: PayloadAction<{ gameUuid: string }>,
		) => {
			const uuid = action.payload.gameUuid;

			state[uuid] = state[uuid] || {};
			state[uuid].status = 'FETCHING';
		},
		fetchGameError: (
			state: GamesState,
			action: PayloadAction<{ gameUuid: string; error: FetchError }>,
		) => {
			const uuid = action.payload.gameUuid;

			state[uuid] = state[uuid] || {};
			state[uuid].status = 'ERRORED';
			if (state[uuid].status === 'ERRORED')
				state[uuid].error = action.payload.error;
		},
		fetchGameSuccess: (
			state: GamesState,
			action: PayloadAction<{ game: CombinedGame }>,
		) => {
			const uuid = action.payload.game.uuid;

			state[uuid] = state[uuid] || {};
			state[uuid].status = 'FETCHED';
			if (state[uuid].status === 'FETCHED')
				state[uuid].data = action.payload.game;
		},
	},
});

export const gamesSliceActions = gamesSlice.actions;

export default gamesSlice.reducer;
