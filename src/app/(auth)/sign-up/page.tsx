import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/forms/SignUpForm';

export default function Page() {
	return (
		<AuthLayout
			leftContent={<SignUpForm />}
			rightContent={
				<>
					<span className="text-center weglot-translate">
						Already have an account?
					</span>
					<a href="/sign-in" className="cta-btn weglot-translate">
						Sign In
					</a>
				</>
			}
		/>
	);
}
