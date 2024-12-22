import store from '@/store/store';
import { backdropSliceActions } from '@/store/ui/backdrop/reducer';

export default class BackdropActions {
	static getZIndex(id: string) {
		const state = store.getState().ui.backdrop;

		return state.stack.find((item) => item.id === id)?.zIndex || 0;
	}

	static isTop(id: string) {
		const state = store.getState().ui.backdrop;

		return state.stack.length > 0
			? state.stack[state.stack.length - 1]?.id === id
			: false;
	}

	static push(id: string) {
		store.dispatch(backdropSliceActions.push({ id }));
	}

	static pop() {
		store.dispatch(backdropSliceActions.pop());
	}

	static remove(id: string) {
		store.dispatch(backdropSliceActions.remove({ id }));
	}
}
