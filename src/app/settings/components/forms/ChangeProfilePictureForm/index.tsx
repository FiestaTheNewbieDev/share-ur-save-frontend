'use client';

import Form from '@/components/Form';
import useToast from '@/hooks/client/useToast';
import IMAGE_PARAMS from '@/misc/constants/imageParams';
import getPlaceholderUrl from '@/misc/getPlaceholderUrl';
import useUser from '@/store/user/selector';
import Image from 'next/image';
import { useState } from 'react';
import './style.scss';

export default function ChangeProfilePictureForm() {
	const user = useUser().user;
	const toast = useToast();

	const [preview, setPreview] = useState<string | null>(null);

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		const profilePicture = event.currentTarget.files?.[0];

		if (!profilePicture) return;

		if (!IMAGE_PARAMS.acceptedFormats.includes(profilePicture.type)) {
			toast.error('Image must be in PNG or JPEG format', {
				translate: 'translate',
			});
			event.currentTarget.value = '';
			return;
		}

		if (profilePicture.size > IMAGE_PARAMS.maxSize) {
			toast.error('Image must be less than 1MB', {
				translate: 'translate',
			});
			event.currentTarget.value = '';
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			if (reader.result) setPreview(reader.result as string);
			else
				toast.error('An error occurred while reading the file.', {
					translate: 'translate',
				});
		};

		reader.onerror = () => {
			toast.error('Failed to read the file. Please try again.', {
				translate: 'translate',
			});
			event.currentTarget.value = '';
		};

		reader.readAsDataURL(profilePicture);
	}

	return (
		<Form className="change-profile-picture-form">
			<div className="row">
				<label className="weglot-translate">Profile Picture</label>
				<div className="input-group">
					<Image
						src={
							preview ||
							user?.pictureUrl ||
							getPlaceholderUrl(128, 128)
						}
						alt=""
						width={128}
						height={128}
					/>
					<input
						type="file"
						id="profile-picture"
						name="profile-picture"
						accept={IMAGE_PARAMS.acceptedFormats.join(', ')}
						onChange={handleFileChange}
					/>
				</div>
			</div>
		</Form>
	);
}
