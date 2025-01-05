import GamePageCtxProvider from '@/app/(games)/game/[slug]/context';
import ActionsSection from '@/app/(games)/game/[slug]/sections/ActionsSection';
import SavesSection from '@/app/(games)/game/[slug]/sections/SavesSection';
import SERVICES from '@/services';
import axios from 'axios';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CombinedGame, SavesTab } from 'share-ur-save-common';
import './style.scss';

export default async function Page({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { tab?: SavesTab; page?: string; size?: string };
}) {
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
			<header>
				<div className="img-wrapper">
					<Image
						src={game.rawgData.background_image}
						layout="fill"
						alt=""
					/>
				</div>

				<div className="info">
					<p className="release-date">
						<span className="weglot-translate">Release date:</span>
						<span className="value">{game.rawgData.released}</span>
					</p>
					<h1 className="game-name">{game.rawgData.name}</h1>
				</div>
			</header>

			<GamePageCtxProvider
				gameUuid={game.uuid}
				tab={searchParams?.tab || 'new-today'}
				page={searchParams?.page ? parseInt(searchParams?.page) : 1}
				size={searchParams?.size ? parseInt(searchParams?.size) : 10}
			>
				<ActionsSection gameUuid={game.uuid} />

				<SavesSection />
			</GamePageCtxProvider>

			{/* <GameS2CGateway game={game} /> */}
		</>
	);
}
