'use client';

import { Button } from '@/components/button';
import AddSaveModal from '@/components/saves/AddSaveModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface IProps {
	gameUuid: string;
}

export default function AddSaveBtn({ gameUuid }: IProps) {
	const [showModal, setShowModal] = useState(false);

	function handleClick() {
		setShowModal(true);
	}

	return (
		<>
			<Button onClick={handleClick}>
				<FontAwesomeIcon icon={faPlus} />
				<span className="weglot-translate">Add Ur Own Save</span>
			</Button>
			<AddSaveModal
				gameUuid={gameUuid}
				visible={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
}
