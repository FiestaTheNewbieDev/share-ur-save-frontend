'use client';

import Button from '@/components/button/Button';
import TextInput from '@/components/input/TextInput';
import useToast from '@hooks/useToast';
import './style.scss';

interface IProps {
	gameUuid: string;
}

export default function AddSaveForm({ gameUuid }: IProps) {
	const toast = useToast();

	function handleSubmit() {
		event?.preventDefault();
	}

	return (
		<form onSubmit={handleSubmit} className="add-save__form">
			<div className="row">
				<label className="weglot-translate">Title</label>
				<TextInput
					className="weglot-translate"
					id="title"
					type="text"
					placeholder="Title"
					full
				/>
			</div>

			<div className="row">
				<label className="weglot-translate">Description</label>
				<TextInput
					className="weglot-translate"
					id="desc"
					type="text"
					placeholder="Description"
					full
					textarea={{ rows: 3 }}
				/>
			</div>

			<div className="row">
				<label className="weglot-translate">Download URL</label>
				<TextInput
					className="weglot-translate"
					id="download-url"
					type="text"
					placeholder="Download URL"
					full
				/>
			</div>

			<Button
				type="submit"
				className="weglot-translate"
				full
				variant="primary"
			>
				Add Ur Save
			</Button>
		</form>
	);
}
