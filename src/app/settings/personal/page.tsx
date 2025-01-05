import ChangeProfilePictureForm from '@/app/settings/components/forms/ChangeProfilePictureForm';
import Breadcrumb from '@/components/BreadCrumb';

export default function Page() {
	return (
		<>
			<header>
				<Breadcrumb
					items={[
						{ label: 'Settings', href: '/settings' },
						{ label: 'Personal', href: '/settings/personal' },
					]}
				/>
				<h2 className="weglot-translate">Personal</h2>
			</header>

			<ChangeProfilePictureForm />
		</>
	);
}
