import getPlaceholderUrl from '@/misc/getPlaceholderUrl';
import Image from 'next/image';
import Link from 'next/link';
import { GameSearchResult } from 'share-ur-save-common';
import './style.scss';

interface IProps {
	game: GameSearchResult;
	onClick?: () => void;
}

export default function ResultsCard({ game, onClick }: IProps) {
	return (
		<Link
			className="quick-search__results-card"
			key={game.uuid}
			href={`/game/${game.slug}`}
			onClick={onClick}
		>
			<Image
				src={game.rawgData.background_image || getPlaceholderUrl()}
				alt=""
				width={170}
				height={96}
			/>

			<div className="desc">
				<p className="title">{game.name}</p>
				<p className="date">{game.rawgData.released}</p>
			</div>
		</Link>
	);
}
