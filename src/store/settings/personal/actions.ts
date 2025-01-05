import { personalSettingsSliceActions } from '@/store/settings/personal/reducer';
import store from '@/store/store';

export class PersonalSettingsActions {
	static async setRequest(id: string, promise: Promise<any>) {
		store.dispatch(
			personalSettingsSliceActions.setRequest({ id, promise }),
		);
	}

	static async save() {
		const state = store.getState().settings.personal;

		if (state.status === 'FETCHING') return Promise.reject();

		store.dispatch(personalSettingsSliceActions.startFetching());

		try {
			await Promise.all(Object.values(state.data.requests));
		} catch (error) {
			store.dispatch(
				personalSettingsSliceActions.fetchError({
					error: {
						code: 500,
					},
				}),
			);
		}
	}

	static async updateProfilePicture() {}
}
