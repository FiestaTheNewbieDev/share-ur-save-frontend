'use client';

import { useEffect, useState } from 'react';

import { useNavbar, useUser } from '@/app/context';
import MiniSearchbar from '@/components/searchbar/MiniSearchbar';
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
	const nav = useNavbar();

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
		<Link
			className="nav-item"
			href={href}
			{...(active && { 'data-active': true })}
			onClick={() => nav.setNavOpen(false)}
		>
			<span style={spanStyle}>
				{icon && <FontAwesomeIcon icon={icon} />}
				{label}
			</span>
		</Link>
	);
}

function AuthNavItems() {
	const user = useUser();

	if (user)
		return <NavItem label="Profile" href="/profile" urls={['/profile']} />;

	return (
		<>
			<NavItem label="Sign In" href="/sign-in" urls={['/sign-in']} />
			<NavItem label="Sign Up" href="/sign-up" urls={['/sign-up']} />
		</>
	);
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
	{
		label: 'Games',
		icon: faGamepad,
		href: '/games',
		urls: ['/games', '/game'],
		spanStyle: {
			display: 'flex',
			gap: 'var(--spacing-xsmall)',
			alignItems: 'center',
		},
	},
];

export default function Navbar() {
	const { isOpen, setNavOpen, toggleNavbar } = useNavbar();

	return (
		<>
			<nav className="navbar">
				<div className="navbar__container">
					<div className="content">
						<Link href="/" className="brand-logo">
							<FontAwesomeIcon icon={faGamepad} />
						</Link>
						<MiniSearchbar full />
						<div className="nav-items">
							{NAV_ITEMS.map((item, index) => (
								<NavItem key={index} {...item} />
							))}
							<AuthNavItems />
						</div>
						<button className="toggle-btn" onClick={toggleNavbar}>
							<FontAwesomeIcon icon={isOpen ? faX : faBars} />
						</button>
					</div>
				</div>

				<div
					className="navbar__mobile-container"
					{...(!isOpen && { 'data-collapsed': true })}
				>
					<div className="nav-items">
						{NAV_ITEMS.map((item, index) => (
							<NavItem key={index} {...item} />
						))}
						<AuthNavItems />
					</div>
				</div>
			</nav>
			<div
				className="navbar__overlay"
				onClick={() => setNavOpen(false)}
				{...(isOpen && { 'data-visible': true })}
			/>
		</>
	);
}
