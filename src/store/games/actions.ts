import { gamesSliceActions } from '@/store/games/reducer';
import store from '@/store/store';
import { CombinedGame } from 'share-ur-save-common';

export default class GamesActions {
	static async setGame(game: CombinedGame) {
		store.dispatch(gamesSliceActions.fetchGameSuccess({ game }));
	}
}
