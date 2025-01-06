import { FetchError } from '@/store/generic/initialState';
import initialState, { SavesState } from '@/store/saves/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AggregatedSave, SavesTab } from 'share-ur-save-common';

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
				saves: AggregatedSave[];
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
		setSave: (
			state: SavesState,
			action: PayloadAction<{
				gameUuid: string;
				tab: SavesTab;
				save: AggregatedSave;
			}>,
		) => {
			const uuid = action.payload.gameUuid;
			const tab = action.payload.tab;
			const newSave = action.payload.save;

			state[uuid] = state[uuid] || {};
			state[uuid][tab] = state[uuid][tab] || {};
			state[uuid][tab].status = 'FETCHED';
			if (state[uuid][tab].status === 'FETCHED')
				state[uuid][tab].data = state[uuid][tab].data.map((save) =>
					save.uuid === newSave.uuid ? newSave : save,
				);
		},
	},
});

export const savesSliceActions = savesSlice.actions;

export default savesSlice.reducer;
