'use client';

import Input from '@/components/auth/forms/Input';
import SERVICES from '@/services';
import {
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const router = useRouter();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (
			event.currentTarget.password.value !==
			event.currentTarget.passwordConfirmation.value
		) {
			console.table(
				event.currentTarget.password.value,
				event.currentTarget.passwordConfirmation.value,
			);

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
				router.push('/profile');
				return 'Signed up successfully';
			},
			// error: (error) => {
			// 	if (error.message.includes('__')) {
			// 		const errorMessages = error.message.split('__').reverse();
			// 		for (let i = 1; i < errorMessages.length; i++)
			// 			toast.error(errorMessages[i]);

			// 		return errorMessages[0];
			// 	} else {
			// 		return error.message;
			// 	}
			// },
		});
	}

	return (
		<form onSubmit={handleSubmit} className="sign-up-form">
			<h1>Sign Up</h1>

			<div className="row">
				<label>Username</label>
				<Input
					id="username"
					type="text"
					placeholder="Username"
					autoComplete="username"
					startIcon={faUser}
				/>
			</div>

			<div className="row">
				<label>Email</label>
				<Input
					id="email"
					type="email"
					placeholder="Email"
					autoComplete="email"
					startIcon={faEnvelope}
				/>
			</div>

			<div className="row">
				<label>Password</label>
				<Input
					id="password"
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					autoComplete="new-password"
					startIcon={faLock}
					endIcon={showPassword ? faEyeSlash : faEye}
					endIconOnClick={() => setShowPassword(!showPassword)}
				/>
			</div>

			<div className="row">
				<label>Password Confirmation</label>
				<Input
					id="passwordConfirmation"
					type={showConfirmPassword ? 'text' : 'password'}
					placeholder="Password Confirmation"
					startIcon={faLock}
					endIcon={showConfirmPassword ? faEyeSlash : faEye}
					endIconOnClick={() =>
						setShowConfirmPassword(!showConfirmPassword)
					}
				/>
			</div>

			<button type="submit" className="submit-btn">
				Sign Up
			</button>
		</form>
	);
}
