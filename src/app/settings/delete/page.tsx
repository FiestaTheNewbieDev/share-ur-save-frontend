import Breadcrumb from '@/components/BreadCrumb';

export default function Page() {
	return (
		<>
			<header>
				<Breadcrumb
					items={[
						{ label: 'Settings', href: '/settings' },
						{ label: 'Delete account', href: '/settings/delete' },
					]}
				/>
				<h2 className="weglot-translate">Delete account</h2>
			</header>
		</>
	);
}
