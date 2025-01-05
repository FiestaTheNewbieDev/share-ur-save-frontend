'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@/components/button';
import Modal from '@/components/Modal';
import ResultsCard from '@/components/searchbar/ResultsCard';
import Searchbar from '@/components/searchbar/Searchbar';
import Spinner from '@/components/Spinner';
import { useState } from 'react';
import { GameSearchResult } from 'share-ur-save-common';
import './style.scss';

export default function MobileQuickSearchbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [results, setResults] = useState<GameSearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	function handleClose() {
		setIsOpen(false);
	}

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className="mobile-quick-searchbar__button"
				circular
			>
				<FontAwesomeIcon icon={faSearch} />
			</Button>
			<Modal
				id="mobile-quick-search"
				className="quick-search__modal"
				visible={isOpen}
				onClose={handleClose}
			>
				<Searchbar
					setResults={setResults}
					setLoading={setIsLoading}
					full
				/>
				{!isLoading && results.length > 0 && (
					<div className="results-container">
						{results.map((game) => (
							<ResultsCard
								key={game.uuid}
								game={game}
								onClick={() => setIsOpen(false)}
							/>
						))}

						{isLoading && (
							<div className="results-loading-container">
								<Spinner />
							</div>
						)}
					</div>
				)}
			</Modal>
		</>
	);
}
