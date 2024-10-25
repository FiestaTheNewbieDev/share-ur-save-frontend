import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';

type GamesService = {
	fetchGame: typeof fetchGame;
};

export async function fetchGame(id: string): Promise<ApiResponse> {
	return requester(false).get<{ game: any }>(`/game/${id}`);
}

const gamesService: GamesService = {
	fetchGame,
};

export default gamesService;
