import { GenericState } from '@/store/generic/initialState';

export type Settings = {
	requests: Record<string, Promise<any>>;
};

export type SettingsGenericState = GenericState<Settings> & {
	data: Settings;
};

export const settingsGenericInitialState: SettingsGenericState = {
	status: 'NOT_FETCHED',
	data: {
		requests: {},
	},
};
