'use client';

import { Button } from '@/components/button';
import IMAGE_PARAMS from '@/misc/constants/imageParams';
import SERVICES from '@/services';
import TextInput from '@components/input/TextInput';
import useToast from '@hooks/client/useToast';
import { AxiosError } from 'axios';
import { useState } from 'react';
import './style.scss';

export type AddSaveFormProps = {
	gameUuid: string;
	onSuccess?: () => void;
	onError?: (error: Error) => void;
	onLoading?: () => void;
	onFinally?: () => void;
};

export default function AddSaveForm({
	gameUuid,
	onSuccess,
	onError,
	onLoading,
	onFinally,
}: AddSaveFormProps) {
	const toast = useToast();

	const [canSubmit, setCanSubmit] = useState(false);

	function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		const thumbnail = event.currentTarget.files?.[0];

		if (!thumbnail) return;

		if (!IMAGE_PARAMS.acceptedFormats.includes(thumbnail.type)) {
			toast.error('Image must be in PNG or JPEG format', {
				translate: 'translate',
			});
			event.currentTarget.value = '';
			return;
		}

		if (thumbnail.size > IMAGE_PARAMS.maxSize) {
			toast.error('Image must be less than 1MB', {
				translate: 'translate',
			});
			event.currentTarget.value = '';
			return;
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;

		const data = {
			title: form.title?.value,
			description: (
				form.elements.namedItem('desc') as HTMLTextAreaElement
			)?.value,
			downloadUrl: form['download-url']?.value,
			thumbnail: form['thumbnail']?.files?.[0],
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
				<label className="weglot-translate">Thumbnail</label>
				<input
					type="file"
					id="thumbnail"
					name="thumbnail"
					accept={IMAGE_PARAMS.acceptedFormats.join(', ')}
					onChange={handleThumbnailChange}
				/>
			</div>

			<div className="row">
				<label className="weglot-translate">Download URL</label>
				<div className="download-url-input">
					<TextInput
						className="weglot-translate"
						id="download-url"
						type="text"
						placeholder="Download URL"
						full
					/>
					<div className="img-wrapper">
						{/* <Image
							src="/logo/logo_drive_2020q4_color_2x_web_64dp.png"
							alt=""
							width={64}
							height={64}
						/> */}
					</div>
				</div>
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
