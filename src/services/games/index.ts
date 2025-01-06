import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { CombinedGame, GameSearchResult, Ordering } from 'share-ur-save-common';

type GamesService = {
	fetchGame: typeof fetchGame;
	fetchGames: typeof fetchGames;
};

export async function fetchGame(
	id: string,
): Promise<ApiResponse<{ game: CombinedGame }>> {
	return requester(true).get<{ game: CombinedGame }>(`/game/${id}`);
}

export async function fetchGames(
	keyword?: string,
	params: { size?: number; ordering?: Ordering } = {},
): Promise<
	ApiResponse<{ keyword: string; count: number; games: GameSearchResult[] }>
> {
	const urlParams = new URLSearchParams('/games');

	if (keyword) urlParams.append('keyword', keyword);

	for (const [key, value] of Object.entries(params)) {
		urlParams.append(key, value.toString());
	}

	// @ts-ignore
	return requester(true).get<{ games: GameSearchResult[] }>(
		`/games?${urlParams.toString()}`,
	);
}

const gamesService: GamesService = {
	fetchGame,
	fetchGames,
};

export default gamesService;
