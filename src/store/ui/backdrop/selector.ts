import { RootState } from '@/store/store';
import { BackdropState } from '@/store/ui/backdrop/initialState';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const getBackdropState = (state: BackdropState): BackdropState => state;

const _useBackdrop = createSelector(getBackdropState, (state) => state);

const useBackdrop = () =>
	useSelector((state: RootState) => _useBackdrop(state.ui.backdrop));

export default useBackdrop;
