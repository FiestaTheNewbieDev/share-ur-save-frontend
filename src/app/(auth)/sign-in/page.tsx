import AuthLayout from '@/components/auth/AuthLayout';
import SignInForm from '@/components/auth/forms/SignInForm';
import Link from 'next/link';

export default function Page() {
	return (
		<AuthLayout
			leftContent={<SignInForm />}
			rightContent={
				<>
					<span className="text-center">No account yet?</span>
					<Link href="/sign-up" className="cta-btn">
						Sign Up
					</Link>
				</>
			}
		/>
	);
}
