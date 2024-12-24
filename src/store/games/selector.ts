import { GamesState, GameState } from '@/store/games/initialState';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const getGameState = (state: GamesState): GamesState => state;

const _useGame = createSelector(getGameState, (state) => state);

const useGame = (uuid: string): GameState =>
	useSelector((state: RootState) => _useGame(state.games)[uuid]);

export default useGame;
