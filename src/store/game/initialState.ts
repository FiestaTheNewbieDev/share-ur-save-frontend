import genericInitialState, {
	GenericState,
} from '@/store/generic/initialState';
import { AggregatedSave, Game } from 'share-ur-save-common';

export type GameState = {
	game: Game | null;
	saves: AggregatedSave[];
};

const initialState: GenericState<GameState> = {
	...genericInitialState,
	data: {
		game: null,
		saves: [],
	},
};

export default initialState;
