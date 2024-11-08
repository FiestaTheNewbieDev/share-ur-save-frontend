import SERVICES from '@/services';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { CombinedGame } from 'share-ur-save-common';

export default async function Page({ params }: { params: { slug: string } }) {
	let game: CombinedGame;

	try {
		const response = await SERVICES.games.fetchGame(params.slug);
		game = response.data.game;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response);
			if (error.response?.status === 404) return notFound();
		}
	}

	if (!game) return notFound();

	return <p>{game.name}</p>;
}
