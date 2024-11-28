'use client';

import TextInput from '@/components/input/TextInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useDebounce } from '@/hooks/useDebounce';
import SERVICES from '@/services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { GameSearchResult } from 'share-ur-save-common';
import './style.scss';

interface IProps {
	full?: boolean;
}

export default function QuickSearchbar(props: IProps) {
	const router = useRouter();

	const [query, setQuery] = useState('');
	const [results, setResults] = useState<GameSearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const debouncedQuery = useDebounce(query, 500);

	useEffect(() => {
		if (debouncedQuery) {
			setIsLoading(true);
			SERVICES.games
				.fetchGames(debouncedQuery, 20)
				.then((response) => {
					setResults(response.data.games);
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => setIsLoading(false));
		} else {
			setResults([]);
		}
	}, [debouncedQuery]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		setQuery(event.currentTarget.value.trim());
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const params = new URLSearchParams();

		if (query.length > 0) params.append('q', query);

		router.push(`/games?${params.toString()}`);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mini-searchbar"
			{...(props.full && { 'data-full': true })}
		>
			<TextInput
				placeholder="Search your favorite games..."
				startIcon={faSearch}
				type="search"
				full
				onChange={handleChange}
			/>
			{(isLoading || results.length > 0) && (
				<div className="results">
					{results.length > 0 &&
						results.map((game) => (
							<>
								<Link
									key={game.uuid}
									className="results-item"
									href={`/game/${game.slug}`}
								>
									{game.name}
								</Link>
								<div className="separator" />
							</>
						))}
					{isLoading && <p>Loading...</p>}
				</div>
			)}
		</form>
	);
}
