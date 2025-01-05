import Breadcrumb from '@/components/BreadCrumb';

export default function Page() {
	return (
		<>
			<header>
				<Breadcrumb
					items={[
						{ label: 'Settings', href: '/settings' },
						{ label: 'Security', href: '/settings/security' },
					]}
				/>
				<h2 className="weglot-translate">Security</h2>
			</header>
		</>
	);
}
