import { FetchError } from '@/store/generic/initialState';
import initialState, { SavesState } from '@/store/saves/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Save, SavesTab } from 'share-ur-save-common';

export const savesSlice = createSlice({
	name: 'saves',
	initialState,
	reducers: {
		startFetchingSaves: (
			state: SavesState,
			action: PayloadAction<{ gameUuid: string; tab: SavesTab }>,
		) => {
			const uuid = action.payload.gameUuid;
			const tab = action.payload.tab;

			state[uuid] = state[uuid] || {};
			state[uuid][tab] = state[uuid][tab] || {};
			state[uuid][tab].status = 'FETCHING';
		},
		fetchSavesError: (
			state: SavesState,
			action: PayloadAction<{
				gameUuid: string;
				tab: SavesTab;
				error: FetchError;
			}>,
		) => {
			const uuid = action.payload.gameUuid;
			const tab = action.payload.tab;

			state[uuid] = state[uuid] || {};
			state[uuid][tab] = state[uuid][tab] || {};
			state[uuid][tab].status = 'ERRORED';
			if (state[uuid][tab].status === 'ERRORED')
				state[uuid][tab].error = action.payload.error;
		},
		fetchSavesSuccess: (
			state: SavesState,
			action: PayloadAction<{
				gameUuid: string;
				tab: SavesTab;
				saves: Save[];
			}>,
		) => {
			const uuid = action.payload.gameUuid;
			const tab = action.payload.tab;

			state[uuid] = state[uuid] || {};
			state[uuid][tab] = state[uuid][tab] || {};
			state[uuid][tab].status = 'FETCHED';
			if (state[uuid][tab].status === 'FETCHED')
				state[uuid][tab].data = action.payload.saves;
		},
	},
});

export const savesSliceActions = savesSlice.actions;

export default savesSlice.reducer;
