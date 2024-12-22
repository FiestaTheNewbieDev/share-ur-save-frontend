'use client';

import Button from '@/components/button/Button';
import TextInput from '@/components/input/TextInput';
import SERVICES from '@/services';
import useToast from '@hooks/useToast';
import { AxiosError } from 'axios';
import './style.scss';

interface IProps {
	gameUuid: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	onLoading?: () => void;
	onFinally?: () => void;
}

export default function AddSaveForm({
	gameUuid,
	onSuccess,
	onError,
	onLoading,
	onFinally,
}: IProps) {
	const toast = useToast();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;

		const data = {
			title: form.title?.value,
			desc: (form.elements.namedItem('desc') as HTMLTextAreaElement)
				?.value,
			downloadUrl: form['download-url']?.value,
		};

		toast.promise(SERVICES.saves.addSave(gameUuid, data), {
			loading: () => {
				onLoading?.();
				return 'Adding save...';
			},
			success: () => {
				onSuccess?.();
				form.reset();
				return 'Save added successfully';
			},
			error: (error: Error) => {
				if (
					error instanceof AxiosError &&
					error.response?.data?.message
				) {
					if (Array.isArray(error.response.data.message)) {
						for (
							let i = error.response.data.message.length - 2;
							i >= 0;
							i--
						) {
							toast.error(error.response.data.message[i]);
						}
						return error.response.data.message[
							error.response.data.message.length - 1
						];
					}

					onError?.(error);

					return error.response?.data.message;
				}

				return 'Oops! Something went wrong';
			},
			finally: () => {
				onFinally?.();
			},
		});
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
