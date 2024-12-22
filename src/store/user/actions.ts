import store from '@/store/store';
import { userSliceActions } from '@/store/user/reducer';
import { User } from '@/types/users';

export default class UserActions {
	static async setUser(user: User) {
		store.dispatch(userSliceActions.setUser({ user }));
	}
	static async clearUser() {
		store.dispatch(userSliceActions.clearUser());
	}
}
