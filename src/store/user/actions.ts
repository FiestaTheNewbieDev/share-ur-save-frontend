import SERVICES from '@/services';
import store from '@/store/store';
import { userSliceActions } from '@/store/user/reducer';
import { User } from '@/types/users';

export default class UserActions {
	static setUser(user: User | null) {
		store.dispatch(userSliceActions.setUser({ user }));
	}
	static async logout() {
		await SERVICES.auth.signOut();
		store.dispatch(userSliceActions.clearUser());
	}
}
