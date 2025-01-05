'use client';

import { useGamePageCtx } from '@/app/(games)/game/[slug]/context';
import { Button } from '@/components/button';
import AddSaveModal from '@/components/saves/AddSaveModal';
import SavesActions from '@/store/saves/actions';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function AddSaveBtn() {
	const [showModal, setShowModal] = useState(false);

	const context = useGamePageCtx();

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
				gameUuid={context.gameUuid}
				visible={showModal}
				onClose={() => setShowModal(false)}
				onFinally={() =>
					SavesActions.fetchSaves(context.gameUuid, {
						tab: context.tab,
						size: context.pagination.size,
						page: context.pagination.page,
					}).then(({ totalCount, totalPages }) => {
						context.pagination.setTotalCount(totalCount);
						context.pagination.setTotalPages(totalPages);
					})
				}
			/>
		</>
	);
}
