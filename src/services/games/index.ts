import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { CombinedGame } from 'share-ur-save-common';

type GamesService = {
	fetchGame: typeof fetchGame;
};

export async function fetchGame(
	id: string,
): Promise<ApiResponse<{ game: CombinedGame }>> {
	return requester(false).get<{ game: CombinedGame }>(`/game/${id}`);
}

const gamesService: GamesService = {
	fetchGame,
};

export default gamesService;
