'use client';

import TextInput from '@/components/input/TextInput';
import useToast from '@/hooks/useToast';
import SERVICES from '@/services';
import {
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import './style.scss';

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);

	const toast = useToast();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = {
			login: event.currentTarget.login.value,
			password: event.currentTarget.password.value,
		};

		toast.promise(SERVICES.auth.signIn(data), {
			loading: 'Signing in...',
			success: () => {
				window.location.href = '/profile/me';
				return 'Signed in successfully';
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
		<form onSubmit={handleSubmit} className="sign-in-form">
			<h1>Sign In</h1>

			<div className="row">
				<label>Username or Email</label>
				<TextInput
					id="login"
					type="text"
					placeholder="Username or Email"
					autoComplete="username"
					startIcon={faUser}
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
				<Link href="/forgot-password" className="forgot-password-link">
					Forgot Password ?
				</Link>
			</div>

			<button type="submit" className="submit-btn">
				Sign In
			</button>
		</form>
	);
}
