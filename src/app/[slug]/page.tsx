import SERVICES from '@/services';
import axios from 'axios';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
	let game;

	try {
		const response = await SERVICES.games.fetchGame(params.slug);
		game = response.data.game;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response);
			if (error.response?.status === 404) notFound();
		}
	}

	return <p></p>;
}
