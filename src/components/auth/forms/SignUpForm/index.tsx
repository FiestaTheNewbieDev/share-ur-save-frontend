'use client';

import TextInput from '@/components/input/TextInput';
import useToast from '@/hooks/useToast';
import SERVICES from '@/services';
import {
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import { useState } from 'react';

export default function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toast = useToast();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (
			event.currentTarget.password.value !==
			event.currentTarget.passwordConfirmation.value
		) {
			toast.error('Passwords do not match');
			return;
		}

		const data = {
			username: event.currentTarget.username.value,
			email: event.currentTarget.email.value,
			password: event.currentTarget.password.value,
		};

		toast.promise(SERVICES.auth.signUp(data), {
			loading: 'Signing up...',
			success: () => {
				window.location.href = '/profile/me';
				return 'Signed up successfully';
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
					return error.response?.data.message;
				}

				return 'Oops! Something went wrong';
			},
		});
	}

	return (
		<form onSubmit={handleSubmit} className="sign-up-form">
			<h1>Sign Up</h1>

			<div className="row">
				<label>Username</label>
				<TextInput
					id="username"
					type="text"
					placeholder="Username"
					autoComplete="username"
					startIcon={faUser}
					full
				/>
			</div>

			<div className="row">
				<label>Email</label>
				<TextInput
					id="email"
					type="email"
					placeholder="Email"
					autoComplete="email"
					startIcon={faEnvelope}
					full
				/>
			</div>

			<div className="row">
				<label>Password</label>
				<TextInput
					id="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					autoComplete="new-password"
					startIcon={faLock}
					endIcon={showPassword ? faEyeSlash : faEye}
					endIconOnClick={() => setShowPassword(!showPassword)}
					full
				/>
			</div>

			<div className="row">
				<label>Password Confirmation</label>
				<TextInput
					id="passwordConfirmation"
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder="Password Confirmation"
					startIcon={faLock}
					endIcon={showConfirmPassword ? faEyeSlash : faEye}
					endIconOnClick={() =>
						setShowConfirmPassword(!showConfirmPassword)
					}
					full
				/>
			</div>

			<button type="submit" className="submit-btn">
				Sign Up
			</button>
		</form>
	);
}
