import { GameSavesState, SavesState } from '@/store/saves/initialState';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const getSavesState = (state: SavesState): SavesState => state;

const _useSaves = createSelector(getSavesState, (state) => state);

const useSaves = (uuid: string): GameSavesState =>
	useSelector((state: RootState) => _useSaves(state.saves)[uuid]);

export default useSaves;
