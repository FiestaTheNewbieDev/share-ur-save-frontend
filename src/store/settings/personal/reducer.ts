import genericSliceActions from '@/store/generic/reducer';
import initialState, {
	PersonalSettingsState,
} from '@/store/settings/personal/initialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const personalSettingsSlice = createSlice({
	name: 'personalSettings',
	initialState: initialState,
	reducers: {
		...genericSliceActions,
		fetchSuccess: (state: PersonalSettingsState) => {
			state.status = 'FETCHED';
			state.data.requests = {};
		},
		setRequest: (
			state: PersonalSettingsState,
			action: PayloadAction<{ id: string; promise: Promise<any> }>,
		) => {
			state.data.requests[action.payload.id] = action.payload.promise;
		},
		clearRequests: (state: PersonalSettingsState) => {
			state.data.requests = {};
		},
	},
});

export const personalSettingsSliceActions = personalSettingsSlice.actions;

export default personalSettingsSlice.reducer;
