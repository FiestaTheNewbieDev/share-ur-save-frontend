import backdropReducer from '@/store/ui/backdrop/reducer';
import navbarReducer from '@/store/ui/navbar/reducer';
import { combineReducers } from '@reduxjs/toolkit';

const uiReducer = combineReducers({
	navbar: navbarReducer,
	backdrop: backdropReducer,
});

export default uiReducer;
