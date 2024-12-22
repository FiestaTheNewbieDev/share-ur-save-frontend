import Button from '@/components/button/Button';
import Modal from '@/components/Modal';
import AddSaveForm from '@/components/saves/forms/AddSaveForm';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

interface IProps {
	gameUuid: string;
	visible: boolean;
	onClose: () => void;
}

export default function AddSaveModal({ gameUuid, visible, onClose }: IProps) {
	return (
		<Modal
			id="add-save"
			className="add-save__modal"
			visible={visible}
			onClose={onClose}
		>
			<div className="header">
				<p className="weglot-translate">Add Ur Save</p>
				<Button
					className="close-btn"
					onClick={onClose}
					variant="transparent"
				>
					<FontAwesomeIcon icon={faX} onClick={onClose} />
				</Button>
			</div>

			<div className="separator" />

			<AddSaveForm gameUuid={gameUuid} />
		</Modal>
	);
}
