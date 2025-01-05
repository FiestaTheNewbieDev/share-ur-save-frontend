import SERVICES from '@/services';
import { savesSliceActions } from '@/store/saves/reducer';
import store from '@/store/store';
import { SavesTab } from 'share-ur-save-common';

export default class SavesActions {
	static async fetchSaves(
		gameUuid: string,
		params: { tab: SavesTab; size: number; page: number },
	): Promise<{ totalCount: number; totalPages: number }> {
		const state = store.getState().saves[gameUuid]?.[params.tab];

		if (state?.status === 'FETCHING') return Promise.reject();

		store.dispatch(
			savesSliceActions.startFetchingSaves({ gameUuid, tab: params.tab }),
		);

		try {
			const response = await SERVICES.saves.fetchGameSaves(gameUuid, {
				...params,
			});

			store.dispatch(
				savesSliceActions.fetchSavesSuccess({
					gameUuid,
					tab: params.tab,
					saves: response.data.saves,
				}),
			);

			return {
				totalCount: response.data.totalCount,
				totalPages: response.data.totalPages,
			};
		} catch (error) {
			store.dispatch(
				savesSliceActions.fetchSavesError({
					gameUuid,
					tab: params.tab,
					error: {
						code: 500,
					},
				}),
			);
			return { totalCount: 0, totalPages: 0 };
		}
	}
}
