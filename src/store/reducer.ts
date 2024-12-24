import { combineReducers } from '@reduxjs/toolkit';
import gamesReducer from '@store/games/reducer';
import savesReducer from '@store/saves/reducer';
import uiReducer from '@store/ui/reducer';
import userReducer from '@store/user/reducer';

const reducer = combineReducers({
	user: userReducer,
	games: gamesReducer,
	saves: savesReducer,
	ui: uiReducer,
});

export default reducer;
