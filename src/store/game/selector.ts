import { GameState } from '@/store/game/initialState';
import { GenericState } from '@/store/generic/initialState';
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

type State = GenericState<GameState>;

const getGameState = (state: State): State => state;

const _useGame = createSelector(getGameState, (state) => state);

const useGame = () => useSelector((state: RootState) => _useGame(state.game));

export default useGame;
