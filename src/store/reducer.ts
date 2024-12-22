import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from '@store/game/reducer';
import uiReducer from '@store/ui/reducer';
import userReducer from '@store/user/reducer';

const reducer = combineReducers({
	user: userReducer,
	game: gameReducer,
	ui: uiReducer,
});

export default reducer;
