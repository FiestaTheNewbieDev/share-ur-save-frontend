'use client';

import Input from '@/components/Input';
import { AuthActions } from '@/stores/auth/actions';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignInForm() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const credentials = { login, password };

		toast.promise(AuthActions.signIn(credentials), {
			loading: 'Signing in...',
			success: 'Signed in successfully',
			error: (error) => {
				if (error.message.includes('__')) {
					const errorMessages = error.message.split('__').reverse();
					for (let i = 1; i < errorMessages.length; i++)
						toast.error(errorMessages[i]);

					return errorMessages[0];
				} else {
					return error.message;
				}
			},
		});
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
			<span className="text-center text-2xl font-semibold">Sign In</span>
			<div className="flex flex-col">
				<label className="mb-1 text-sm">Username or Email</label>
				<Input
					type="text"
					placeholder="Username or Email"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					autoComplete="username"
					startIcon={faEnvelope}
				/>
			</div>
			<div className="flex flex-col">
				<label className="mb-1 text-sm">Password</label>
				<Input
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					startIcon={faLock}
					endIcon={showPassword ? faEyeSlash : faEye}
					endIconOnClick={() => setShowPassword(!showPassword)}
				/>
				<a href="/" className="ml-auto mr-0 mt-1 w-fit text-sm">
					Forgot password ?
				</a>
			</div>
			<button
				type="submit"
				className="rounded-lg bg-brand_red p-2 text-white"
			>
				Sign In
			</button>
		</form>
	);
}
