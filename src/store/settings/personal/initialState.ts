import {
	settingsGenericInitialState,
	SettingsGenericState,
} from '@/store/settings/initialState';

const initialState: SettingsGenericState = {
	...settingsGenericInitialState,
};

export type PersonalSettingsState = typeof initialState;

export default initialState;
