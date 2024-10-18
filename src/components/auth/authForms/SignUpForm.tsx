'use client';

import Input from '@/components/Input';
import { AuthActions } from '@/stores/auth/actions';
import {
	faEnvelope,
	faEye,
	faEyeSlash,
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignUpForm() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (password !== passwordConfirm) {
			toast.error('Passwords do not match');
			return;
		}

		const data = { username, email, password };

		toast.promise(AuthActions.signUp(data), {
			loading: 'Signing up...',
			success: 'Signed up successfully',
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
			<span className="text-center text-2xl font-semibold">Sign Up</span>
			<div className="flex flex-col">
				<label className="mb-1 text-sm">Username</label>
				<Input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					autoComplete="username"
					startIcon={faUser}
				/>
			</div>
			<div className="flex flex-col">
				<label className="mb-1 text-sm">Email</label>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
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
					autoComplete="new-password"
					startIcon={faLock}
					endIcon={showPassword ? faEyeSlash : faEye}
					endIconOnClick={() => setShowPassword(!showPassword)}
				/>
			</div>
			<div className="flex flex-col">
				<label className="mb-1 text-sm">Password Confirmation</label>
				<Input
					type={showPasswordConfirm ? 'text' : 'password'}
					placeholder="Password Confirmation"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					startIcon={faLock}
					endIcon={showPasswordConfirm ? faEyeSlash : faEye}
					endIconOnClick={() =>
						setShowPasswordConfirm(!showPasswordConfirm)
					}
				/>
			</div>
			<button
				type="submit"
				className="rounded-lg bg-brand_red p-2 text-white"
			>
				Sign Up
			</button>
		</form>
	);

	// return (
	// 	<form className="flex w-full flex-col gap-4">
	// 		<span className="text-center text-2xl font-semibold">Sign Up</span>{' '}
	// 		<div className="flex flex-col">
	// 			<label className="mb-1 text-sm">Username</label>
	// 			<div className="relative flex items-center">
	// 				{' '}
	// 				<FontAwesomeIcon
	// 					icon={faUser}
	// 					className="pointer-events-none absolute ml-2"
	// 				/>
	// 				<input
	// 					placeholder="Username"
	// 					className="w-full rounded-lg bg-slate-100 py-2 pl-8 pr-2"
	// 					type="text"
	// 					value={username}
	// 					onChange={(e) => setUsername(e.target.value)}
	// 					autoComplete="username"
	// 				/>
	// 			</div>
	// 		</div>
	// 		<div className="flex flex-col">
	// 			<label className="mb-1 text-sm">Email</label>
	// 			<div className="relative flex items-center">
	// 				<FontAwesomeIcon
	// 					icon={faEnvelope}
	// 					className="pointer-events-none absolute ml-2"
	// 				/>
	// 				<input
	// 					placeholder="Email"
	// 					className="w-full rounded-lg bg-slate-100 py-2 pl-8 pr-2"
	// 					type="email"
	// 					value={email}
	// 					onChange={(e) => setEmail(e.target.value)}
	// 					autoComplete="email"
	// 				/>
	// 			</div>
	// 		</div>
	// 		<div className="flex flex-col">
	// 			<label className="mb-1 text-sm">Password</label>
	// 			<div className="relative flex items-center">
	// 				<FontAwesomeIcon
	// 					icon={faLock}
	// 					className="pointer-events-none absolute left-2"
	// 				/>
	// 				<input
	// 					placeholder="Password"
	// 					className="ring-none w-full rounded-lg bg-slate-100 px-8 py-2"
	// 					type={showPassword ? 'text' : 'password'}
	// 					value={password}
	// 					onChange={(e) => setPassword(e.target.value)}
	// 				/>
	// 				<button
	// 					type="button"
	// 					onClick={displayPassword}
	// 					className="absolute right-2"
	// 				>
	// 					{showPassword ? (
	// 						<FontAwesomeIcon icon={faEyeSlash} />
	// 					) : (
	// 						<FontAwesomeIcon icon={faEye} />
	// 					)}
	// 				</button>
	// 			</div>
	// 		</div>
	// 		<div className="flex flex-col">
	// 			<label className="mb-1 text-sm">Password Confirmation</label>
	// 			<div className="relative flex items-center">
	// 				<FontAwesomeIcon
	// 					icon={faLock}
	// 					className="pointer-events-none absolute left-2"
	// 				/>
	// 				<input
	// 					placeholder="Password Confirmation"
	// 					className="ring-none w-full rounded-lg bg-slate-100 px-8 py-2"
	// 					type={showPasswordConfirm ? 'text' : 'password'}
	// 					value={passwordConfirm}
	// 					onChange={(e) => setPasswordConfirm(e.target.value)}
	// 				/>
	// 				<button
	// 					type="button"
	// 					onClick={displayPasswordConfirm}
	// 					className="absolute right-2"
	// 				>
	// 					{showPasswordConfirm ? (
	// 						<FontAwesomeIcon icon={faEyeSlash} />
	// 					) : (
	// 						<FontAwesomeIcon icon={faEye} />
	// 					)}
	// 				</button>
	// 			</div>
	// 		</div>
	// 		<button
	// 			type="submit"
	// 			className="rounded-lg bg-anthracite p-2 text-white"
	// 		>
	// 			Sign In
	// 		</button>
	// 	</form>
	// );
}

// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// 	faUser,
// 	faEnvelope,
// 	faLock,
// 	faEye,
// 	faEyeSlash
// } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'sonner';
// import { createUser } from '@/services/api';
// import { signIn } from '@/lib/features/authSlice';
// import '@fortawesome/fontawesome-svg-core/styles.css';

// export default function SignUpForm() {
// 	const router = useRouter();

// 	const dispatch = useDispatch();

// 	const [username, setUsername] = useState('');
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
// 	const [passwordConfirm, setPasswordConfirm] = useState('');
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

// 	function displayPassword(event: React.MouseEvent<HTMLButtonElement>) {
// 		event.preventDefault();

// 		setShowPassword(!showPassword);
// 	}

// 	function displayPasswordConfirm(
// 		event: React.MouseEvent<HTMLButtonElement>
// 	) {
// 		event.preventDefault();

// 		setShowPasswordConfirm(!showPasswordConfirm);
// 	}

// 	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
// 		event.preventDefault();

// 		try {
// 			const response = await createUser({
// 				username: username,
// 				email: email,
// 				password: password
// 			});

// 			dispatch(
// 				signIn({ jwt: response.data.jwt, user: response.data.user })
// 			);

// 			router.replace('/');
// 		} catch (error: any) {
// 			switch (error.name) {
// 				case 'AxiosError':
// 					error.response.data.errors.map(
// 						(error: { message: string }) =>
// 							toast.error(error.message)
// 					);
// 					break;
// 				default:
// 					console.error(error);
// 			}
// 		}
// 	}

// 	return (
// 		<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
// 			<span className="text-center text-2xl font-semibold">Sign Up</span>
// 			<div className="flex flex-col">
// 				<label className="mb-1 text-sm">Username</label>
// 				<div className="relative flex items-center">
// 					<FontAwesomeIcon
// 						icon={faUser}
// 						className="pointer-events-none absolute ml-2"
// 					/>
// 					<input
// 						placeholder="Username"
// 						className="w-full rounded-lg bg-slate-100 py-2 pl-8 pr-2"
// 						type="text"
// 						value={username}
// 						onChange={e => setUsername(e.target.value)}
// 						autoComplete="username"
// 					/>
// 				</div>
// 			</div>
// 			<div className="flex flex-col">
// 				<label className="mb-1 text-sm">Email</label>
// 				<div className="relative flex items-center">
// 					<FontAwesomeIcon
// 						icon={faEnvelope}
// 						className="pointer-events-none absolute ml-2"
// 					/>
// 					<input
// 						placeholder="Email"
// 						className="w-full rounded-lg bg-slate-100 py-2 pl-8 pr-2"
// 						type="email"
// 						value={email}
// 						onChange={e => setEmail(e.target.value)}
// 						autoComplete="email"
// 					/>
// 				</div>
// 			</div>
// 			<div className="flex flex-col">
// 				<label className="mb-1 text-sm">Password</label>
// 				<div className="relative flex items-center">
// 					<FontAwesomeIcon
// 						icon={faLock}
// 						className="pointer-events-none absolute left-2"
// 					/>
// 					<input
// 						placeholder="Password"
// 						className="ring-none w-full rounded-lg bg-slate-100 px-8 py-2"
// 						type={showPassword ? 'text' : 'password'}
// 						value={password}
// 						onChange={e => setPassword(e.target.value)}
// 					/>
// 					<button
// 						type="button"
// 						onClick={displayPassword}
// 						className="absolute right-2"
// 					>
// 						{showPassword ? (
// 							<FontAwesomeIcon icon={faEyeSlash} />
// 						) : (
// 							<FontAwesomeIcon icon={faEye} />
// 						)}
// 					</button>
// 				</div>
// 			</div>
// 			<div className="flex flex-col">
// 				<label className="mb-1 text-sm">Password Confirmation</label>
// 				<div className="relative flex items-center">
// 					<FontAwesomeIcon
// 						icon={faLock}
// 						className="pointer-events-none absolute left-2"
// 					/>
// 					<input
// 						placeholder="Password Confirmation"
// 						className="ring-none w-full rounded-lg bg-slate-100 px-8 py-2"
// 						type={showPasswordConfirm ? 'text' : 'password'}
// 						value={passwordConfirm}
// 						onChange={e => setPasswordConfirm(e.target.value)}
// 					/>
// 					<button
// 						type="button"
// 						onClick={displayPasswordConfirm}
// 						className="absolute right-2"
// 					>
// 						{showPasswordConfirm ? (
// 							<FontAwesomeIcon icon={faEyeSlash} />
// 						) : (
// 							<FontAwesomeIcon icon={faEye} />
// 						)}
// 					</button>
// 				</div>
// 			</div>
// 			<button
// 				type="submit"
// 				className="rounded-lg bg-anthracite p-2 text-white"
// 			>
// 				Sign In
// 			</button>
// 		</form>
// 	);
// }
