'use client';

import { useEffect, useState } from 'react';

import { useUser } from '@/app/context';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
	faBars,
	faGamepad,
	faHome,
	faX,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './style.scss';

type NavItem = {
	label: string;
	icon?: IconDefinition;
	href: string;
	urls: string[];
	spanStyle?: React.CSSProperties;
};

function NavItem({ label, icon, href, urls, spanStyle }: NavItem) {
	const [active, setActive] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (urls.length) {
			setActive(
				urls.some(
					(url) => pathname === url || pathname.startsWith(`${url}/`),
				),
			);
		}
	}, [pathname, urls]);

	return (
		<Link className="nav-item" href={href} data-active={active}>
			<span style={spanStyle}>
				{icon && <FontAwesomeIcon icon={icon} />}
				{label}
			</span>
		</Link>
	);
}

function AuthNavItems() {
	const user = useUser();

	return <></>
}

const NAV_ITEMS: NavItem[] = [
	{
		label: 'Home',
		icon: faHome,
		href: '/',
		urls: ['/'],
		spanStyle: {
			display: 'flex',
			gap: 'var(--spacing-xsmall)',
			alignItems: 'baseline',
		},
	},
];

export default function Navbar() {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<nav className="navbar">
			<div className="container">
				<Link href="/" className="brand-logo">
					<FontAwesomeIcon icon={faGamepad} />
				</Link>
				<div className="content">
					<div className="nav-items">
						{NAV_ITEMS.map((item, index) => (
							<NavItem key={index} {...item} />
						))}
						<AuthNavItems />
					</div>
				</div>
				<button
					className="collapse-btn"
					onClick={() => setCollapsed(!collapsed)}
				>
					<FontAwesomeIcon icon={collapsed ? faBars : faX} />
				</button>
			</div>
		</nav>
	);
}
