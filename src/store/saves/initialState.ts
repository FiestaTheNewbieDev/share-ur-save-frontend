import { GenericState } from '@/store/generic/initialState';
import { AggregatedSave, SavesTab } from 'share-ur-save-common';

export type GameSavesState = Record<SavesTab, GenericState<AggregatedSave[]>>;

export type SavesState = Record<string, GameSavesState>;

const initialState: SavesState = {};

export default initialState;
