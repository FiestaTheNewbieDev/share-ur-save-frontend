import { RootState } from '@/store/store';
import { NavbarState } from '@/store/ui/navbar/initialState';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const getNavbarState = (state: NavbarState): NavbarState => state;

const _useNavbar = createSelector(getNavbarState, (state) => state);

const useNavbar = () =>
	useSelector((state: RootState) => _useNavbar(state.ui.navbar));

export default useNavbar;
