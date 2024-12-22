'use client';

import { useEffect, useState } from 'react';

import Backdrop from '@/components/Backdrop';
import Button from '@/components/button/Button';
import AuthNavItems from '@/components/Navbar/AuthNavItems';
import MobileQuickSearchbar from '@/components/searchbar/MobileQuickSearchbar';
import QuickSearchbar from '@/components/searchbar/QuickSearchbar';
import useBreakpoint from '@/hooks/useBreakpoint';
import BREAKPOINTS from '@/misc/breakpoints';
import NAV_ITEMS from '@/misc/navItems';
import BackdropActions from '@/store/ui/backdrop/actions';
import NavbarActions from '@/store/ui/navbar/actions';
import useNavbar from '@/store/ui/navbar/selector';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
	faBars,
	faGamepad,
	faX,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './style.scss';

export default function Navbar() {
	const [zIndex, setZIndex] = useState(0);

	const { isOpen } = useNavbar();
	const breakpoint = useBreakpoint();

	useEffect(() => {
		if (isOpen) {
			BackdropActions.push('navbar');
		} else {
			BackdropActions.remove('navbar');
		}
	}, [isOpen]);

	return (
		<>
			<Backdrop
				className="navbar__backdrop"
				id="navbar"
				onClick={() => NavbarActions.setNavOpen(false)}
				setZIndex={setZIndex}
			/>
			<nav className="navbar" style={{ zIndex: zIndex }}>
				<div className="navbar__container">
					<div className="content">
						<Link href="/" className="brand-logo">
							<FontAwesomeIcon icon={faGamepad} />
						</Link>
						{breakpoint.width > BREAKPOINTS.TABLET ? (
							<QuickSearchbar full />
						) : (
							<MobileQuickSearchbar />
						)}
						<div className="nav-items">
							{NAV_ITEMS.map((item, index) => (
								<Navbar.Item key={index} {...item} />
							))}
							<AuthNavItems />
						</div>
						<Button
							className="toggle-btn"
							onClick={NavbarActions.toggleNavbar}
						>
							<FontAwesomeIcon icon={isOpen ? faX : faBars} />
						</Button>
					</div>
				</div>

				<div
					className="navbar__mobile-container"
					{...(!isOpen && { 'data-collapsed': true })}
				>
					<div className="nav-items">
						{NAV_ITEMS.map((item, index) => (
							<Navbar.Item key={index} {...item} />
						))}
						<AuthNavItems />
					</div>
				</div>
			</nav>
		</>
	);
}

Navbar.displayName = 'Navbar';

export interface INavItem {
	label: string;
	icon?: IconDefinition;
	href: string;
	urls: string[];
	spanStyle?: React.CSSProperties;
	translate?: boolean;
}

function NavItem({ label, icon, href, urls, spanStyle, translate }: INavItem) {
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
			onClick={() => NavbarActions.setNavOpen(false)}
		>
			<span style={spanStyle}>
				{icon && <FontAwesomeIcon icon={icon} />}
				<span className={translate ? 'weglot-translate' : ''}>
					{label}
				</span>
			</span>
		</Link>
	);
}

Navbar.Item = NavItem;
