import { gameSliceActions } from '@/store/game/reducer';
import store from '@/store/store';
import { Game } from 'share-ur-save-common';

export default class GameActions {
	static async setGame(game: Game) {
		store.dispatch(gameSliceActions.setGame({ game }));
	}
}
