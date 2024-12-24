import { FetchError, GenericState } from '@/store/generic/initialState';
import { PayloadAction } from '@reduxjs/toolkit';

const genericSliceActions = {
	startFetching: (state: GenericState<any>) => {
		state.status = 'FETCHING';
	},
	fetchError: (
		state: GenericState<any>,
		action: PayloadAction<{ error: FetchError }>,
	) => {
		state.status = 'ERRORED';
		if (state.status === 'ERRORED') state.error = action.payload.error;
	},
	fetchSuccess: (state: GenericState<any>, action: PayloadAction<any>) => {
		state.status = 'FETCHED';
		if (state.status === 'FETCHED') state.data = action.payload;
	},
};

export default genericSliceActions;
