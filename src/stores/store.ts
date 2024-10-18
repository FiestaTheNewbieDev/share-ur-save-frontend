import authReducer from '@/stores/auth/reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

export const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
	}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
