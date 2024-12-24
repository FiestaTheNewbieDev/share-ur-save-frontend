import { GenericState } from '@/store/generic/initialState';
import { CombinedGame } from 'share-ur-save-common';

export type GameState = GenericState<CombinedGame>;

export type GamesState = Record<string, GameState>;

const initialState: GamesState = {};

export default initialState;
