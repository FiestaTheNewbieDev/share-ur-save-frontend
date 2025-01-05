import { Button } from '@/components/button';
import Modal from '@/components/Modal';
import AddSaveForm, {
	AddSaveFormProps,
} from '@/components/saves/forms/AddSaveForm';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

type Props = {
	visible: boolean;
	onClose: () => void;
} & AddSaveFormProps;

export default function AddSaveModal({ visible, onClose, ...props }: Props) {
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

			<AddSaveForm onSuccess={onClose} {...props} />
		</Modal>
	);
}
