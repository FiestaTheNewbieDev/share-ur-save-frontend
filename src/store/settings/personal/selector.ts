import { PersonalSettingsState } from '@/store/settings/personal/initialState';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

const getPersonalSettings = (state: PersonalSettingsState) => state;

const _usePersonalSettings = createSelector(
	getPersonalSettings,
	(state) => state,
);

const usePersonalSettings = (): PersonalSettingsState =>
	useSelector((state: RootState) =>
		_usePersonalSettings(state.settings.personal),
	);

export default usePersonalSettings;
