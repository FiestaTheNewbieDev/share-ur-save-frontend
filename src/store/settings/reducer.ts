import personalSettingsReducer from '@/store/settings/personal/reducer';
import { combineReducers } from '@reduxjs/toolkit';

const settingsReducer = combineReducers({
	personal: personalSettingsReducer,
});

export default settingsReducer;
