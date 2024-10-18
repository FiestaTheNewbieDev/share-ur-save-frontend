import SignInForm from '@/components/auth/authForms/SignInForm';
import AuthLayout from '@/components/auth/AuthLayout';

export default async function Page() {
	return (
		<AuthLayout
			left={
				<>
					<h1 className="hidden" aria-hidden="true">
						Sign In
					</h1>
					<SignInForm />
				</>
			}
			right={
				<>
					<span className="text-center text-white">
						No account yet?
					</span>
					<a
						href="/sign-up"
						className="mx-auto w-fit rounded-lg border-2 border-white p-2 px-8 text-center text-white"
					>
						Sign Up
					</a>
				</>
			}
		/>
	);
}
