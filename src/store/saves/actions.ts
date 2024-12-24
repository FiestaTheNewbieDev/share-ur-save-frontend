import SERVICES from '@/services';
import { savesSliceActions } from '@/store/saves/reducer';
import store from '@/store/store';
import { SavesTab } from 'share-ur-save-common';

export default class SavesActions {
	static async fetchSaves(
		gameUuid: string,
		params: { tab: SavesTab; size: number; page: number },
	) {
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
		} catch (error) {}
	}
}
