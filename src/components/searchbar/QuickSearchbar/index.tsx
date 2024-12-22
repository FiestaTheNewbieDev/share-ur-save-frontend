'use client';

import Popover from '@/components/Popover';
import Searchbar from '@/components/searchbar/Searchbar';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GameSearchResult } from 'share-ur-save-common';
import './style.scss';

interface IProps {
	full?: boolean;
}

export default function QuickSearchbar(props: IProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [results, setResults] = useState<GameSearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<form
			className="quick-searchbar"
			onSubmit={handleSubmit}
			{...(props.full && { 'data-full': true })}
		>
			<Popover
				className="quick-searchbar__popover__wrapper"
				visible={isOpen && (isLoading || results.length > 0)}
				onClose={() => setIsOpen(false)}
				content={
					<>
						{!isLoading &&
							results.length > 0 &&
							results.map((game) => (
								<Link
									className="results-item"
									key={game.uuid}
									href={`/game/${game.slug}`}
									onClick={() => setIsOpen(false)}
								>
									<Image
										src={
											game.rawgData.background_image ||
											'https://placehold.co/170x96.jpg'
										}
										alt=""
										width={170}
										height={96}
									/>

									<div className="desc">
										<p className="title">{game.name}</p>
										<p className="date">
											{game.rawgData.released}
										</p>
									</div>
								</Link>
							))}
						{isLoading && <Spinner />}
					</>
				}
			>
				<Searchbar
					onFocus={() => setIsOpen(true)}
					full={props.full}
					setResults={setResults}
					setLoading={setIsLoading}
				/>
			</Popover>
		</form>
	);
}
