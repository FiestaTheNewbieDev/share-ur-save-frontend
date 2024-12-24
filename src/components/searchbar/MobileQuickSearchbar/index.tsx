'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@/components/button';
import Modal from '@/components/Modal';
import Searchbar from '@/components/searchbar/Searchbar';
import { useState } from 'react';
import { GameSearchResult } from 'share-ur-save-common';
import './style.scss';

export default function MobileQuickSearchbar() {
	const [results, setResults] = useState<GameSearchResult[]>([]);
	const [isOpen, setIsOpen] = useState(false);

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
				visible={isOpen}
				onClose={handleClose}
			>
				<Searchbar setResults={setResults} full />
			</Modal>
		</>
	);
}
