import store from '@/store/store';
import { navbarSliceActions } from '@/store/ui/navbar/reducer';

export default class NavbarActions {
	static setNavOpen(isOpen: boolean) {
		store.dispatch(navbarSliceActions.setNavOpen({ isOpen }));
	}

	static toggleNavbar() {
		store.dispatch(navbarSliceActions.toggleNavbar());
	}
}
