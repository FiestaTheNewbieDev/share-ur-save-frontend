import { signIn, signOut, signUp } from '@/services/AuthService';
import { authSliceActions, signOutAction } from '@/stores/auth/reducer';
import { store } from '@/stores/store';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthActions = {
	signUp: async (data: {
		username: string;
		email: string;
		password: string;
	}) => {
		const state = store.getState().auth;

		if (state.fetching) throw new Error('Already fetching');

		store.dispatch(authSliceActions.startFetching());

		try {
			const response = await signUp(data);

			Cookies.set('token', response.data.token);

			store.dispatch(
				authSliceActions.fetchSuccess({ data: response.data }),
			);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const response = error.response;

				store.dispatch(
					authSliceActions.fetchError({ error: response?.data }),
				);

				if (Array.isArray(response?.data.message)) {
					throw new Error(response?.data.message.join('__'));
				}

				throw new Error(response?.data.message);
			} else {
				store.dispatch(
					authSliceActions.fetchError({
						error: { error: error.name, message: error.message },
					}),
				);

				throw new Error(error.message);
			}
		}
	},
	signIn: async (data: { login: string; password: string }) => {
		const state = store.getState().auth;

		if (state.fetching) throw new Error('Already fetching');

		store.dispatch(authSliceActions.startFetching());

		try {
			const response = await signIn(data);

			Cookies.set('token', response.data.token);

			store.dispatch(
				authSliceActions.fetchSuccess({ data: response.data }),
			);
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const response = error.response;

				store.dispatch(
					authSliceActions.fetchError({ error: response?.data }),
				);

				if (Array.isArray(response?.data.message)) {
					throw new Error(response?.data.message.join('__'));
				}

				throw new Error(response?.data.message);
			} else {
				store.dispatch(
					authSliceActions.fetchError({
						error: { error: error.name, message: error.message },
					}),
				);

				throw new Error(error.message);
			}
		}
	},
	signOut: async () => {
		try {
			await signOut();
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				const response = error.response;

				// if (response?.data && response?.data?.message) {
				// 	if (Array.isArray(response?.data.message)) {
				// 		throw new Error(response?.data.message.join('__'));
				// 	}

				// 	throw new Error(response?.data.message);
				// }
			}

			// throw new Error(error.message);
		}
		store.dispatch(signOutAction());
	},
};
