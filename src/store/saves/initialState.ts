import { GenericState } from '@/store/generic/initialState';
import { Save, SavesTab } from 'share-ur-save-common';

export type GameSavesState = Record<SavesTab, GenericState<Save[]>>;

export type SavesState = Record<string, GameSavesState>;

const initialState: SavesState = {};

export default initialState;
