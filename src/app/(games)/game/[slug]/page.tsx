import SERVICES from '@/services';
import axios from 'axios';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CombinedGame } from 'share-ur-save-common';

export default async function Page(props: { params: { slug: string } }) {
	const params = props.params;
	let game: CombinedGame | null = null;

	try {
		const response = await SERVICES.games.fetchGame(params.slug);
		game = response.data.game;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.response);
			if (error.response?.status === 404) return notFound();
		}
	}

	if (!game) return notFound();

	return (
		<>
			<div className="game__cover">
				{game.rawgData.background_image && (
					<Image
						src={game.rawgData.background_image}
						layout="fill"
						alt=""
						quality={50}
					/>
				)}
			</div>

			<div className="header">
				<p className="release-date">{game.rawgData.released}</p>
				<h1 className="game-name">{game.rawgData.name}</h1>
			</div>
		</>
	);
}
