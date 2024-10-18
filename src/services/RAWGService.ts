import { RAWG } from '@/services/ServiceHelper';

export function fetchGames(
	search: string = '',
	page: number = 1,
	pageSize: number = 20,
	ordering:
		| 'name'
		| 'released'
		| 'added'
		| 'created'
		| 'updated'
		| 'rating'
		| 'metacritic'
		| null
		| undefined = null,
	reverse: boolean = true,
) {
	const apiKey = process.env.RAWG_API_KEY;
	if (!apiKey) throw new Error('RAWG_API_KEY is not set');

	const params = new URLSearchParams({
		key: apiKey,
		search,
		page: page.toString(),
		page_size: pageSize.toString(),
	});

	if (ordering) params.append('ordering', `${reverse ? '-' : ''}${ordering}`);

	return RAWG.get(`/games?${params}`);
}

export function fetchGame(id: string) {
	return RAWG.get(`/games/${id}`);
}
