'use client';

import Input from '@/components/auth/forms/Input';
import SERVICES from '@/services';
import {
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import './style.scss';

export default function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = {
			login: event.currentTarget.login.value,
			password: event.currentTarget.password.value,
		};

		toast.promise(SERVICES.auth.signIn(data), {
			loading: 'Signing in...',
			success: () => {
				router.push('/profile');
				return 'Signed in successfully';
			},
		});
	}

	return (
		<form onSubmit={handleSubmit} className="sign-in-form">
			<h1>Sign In</h1>

			<div className="row">
				<label>Username or Email</label>
				<Input
					id="login"
					type="text"
					placeholder="Username or Email"
					autoComplete="username"
					startIcon={faUser}
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
				<Link href="/forgot-password" className="forgot-password-link">
					Forgot Password ?
				</Link>
			</div>

			<button type="submit" className="submit-btn">
				Sign Up
			</button>
		</form>
	);
}
