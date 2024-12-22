'use client';

import TextInput from '@/components/input/TextInput';
import { useDebounce } from '@/hooks/useDebounce';
import SERVICES from '@/services';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { GameSearchResult } from 'share-ur-save-common';

interface IProps {
	onFocus?: () => void;
	setResults: (results: GameSearchResult[]) => void;
	setLoading?: (loading: boolean) => void;
	full?: boolean;
}

export default function Searchbar({
	onFocus,
	setResults,
	setLoading,
	full,
}: IProps) {
	const [query, setQuery] = useState('');

	const debouncedQuery = useDebounce(query, 500);

	useEffect(() => {
		if (debouncedQuery) {
			if (setLoading) setLoading(true);
			SERVICES.games
				.fetchGames(debouncedQuery, { size: 10, ordering: 'rating' })
				.then((response) => {
					setResults(response.data.games);
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					if (setLoading) setLoading(false);
				});
		} else {
			setResults([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedQuery]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setQuery(event.target.value);
	}

	function handleClear() {
		setQuery('');
		setResults([]);
	}

	return (
		<TextInput
			className="weglot-translate"
			onFocus={onFocus}
			placeholder="Search your favorite games..."
			startIcon={faSearch}
			value={query}
			type="text"
			full={full}
			onChange={handleChange}
			{...(query.length > 0 && {
				endIcon: faX,
				endIconOnClick: handleClear,
			})}
		/>
	);
}
