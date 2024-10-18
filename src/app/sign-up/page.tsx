import SignUpForm from '@/components/auth/authForms/SignUpForm';
import AuthLayout from '@/components/auth/AuthLayout';

export default function Page() {
	return (
		<AuthLayout
			left={
				<>
					<h1 className="hidden" aria-hidden="true">
						Sign Up
					</h1>
					<SignUpForm />
				</>
			}
			right={
				<>
					<span className="text-center text-white">
						Already have an account?
					</span>
					<a
						href="/sign-in"
						className="mx-auto w-fit rounded-lg border-2 border-white p-2 px-8 text-center text-white"
					>
						Sign In
					</a>
				</>
			}
		/>
	);
}
