import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { CombinedGame, GameSearchResult } from 'share-ur-save-common';

type GamesService = {
	fetchGame: typeof fetchGame;
	fetchGames: typeof fetchGames;
};

export async function fetchGame(
	id: string,
): Promise<ApiResponse<{ game: CombinedGame }>> {
	return requester(false).get<{ game: CombinedGame }>(`/game/${id}`);
}

export async function fetchGames(
	keyword?: string,
	size?: number,
): Promise<
	ApiResponse<{ keyword: string; count: number; games: GameSearchResult[] }>
> {
	const params = new URLSearchParams('/games');

	if (keyword) params.append('keyword', keyword);
	if (size) params.append('size', size.toString());

	// @ts-ignore
	return requester(false).get<{ games: GameSearchResult[] }>(
		`/games?${params.toString()}`,
	);
}

const gamesService: GamesService = {
	fetchGame,
	fetchGames,
};

export default gamesService;
