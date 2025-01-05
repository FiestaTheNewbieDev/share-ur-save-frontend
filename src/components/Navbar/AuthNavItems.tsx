'use client';

import getDisplayName from '@/misc/user/getDisplayName';
import { User } from '@/types/users';
import Modal from '@components/Modal';
import Navbar from '@components/Navbar';
import Popover from '@components/Popover';
import useBreakpoint from '@hooks/client/useBreakpoint';
import BREAKPOINTS from '@misc/constants//breakpoints';
import UserActions from '@store/user/actions';
import useUser from '@store/user/selector';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Links({ onLogout }: { onLogout: () => void }) {
	return (
		<>
			<div className="links">
				<Link
					className="link weglot-translate"
					href="/settings/personal"
				>
					Settings
				</Link>
			</div>
			<button className="link weglot-translate" onClick={onLogout}>
				Logout
			</button>
		</>
	);
}

function UserNavItem({ user }: { user: User }) {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState(false);
	const pathname = usePathname();
	const breakpoint = useBreakpoint();
	const router = useRouter();

	const urls = ['/account'];

	function handleLogout() {
		UserActions.logout().finally(() => {
			router.refresh();
		});
	}

	useEffect(() => {
		if (urls.length) {
			setActive(
				urls.some(
					(url) => pathname === url || pathname.startsWith(`${url}/`),
				),
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	if (breakpoint.width < BREAKPOINTS.TABLET)
		return (
			<>
				<button
					className="nav-item"
					onClick={() => setIsOpen(true)}
					{...(active && { 'data-active': true })}
				>
					<span>{getDisplayName(user)}</span>
				</button>
				<Modal
					id="user-nav-item"
					className="user-nav-item__modal"
					visible={isOpen}
					onClose={() => setIsOpen(false)}
				>
					<Links onLogout={handleLogout} />
				</Modal>
			</>
		);

	return (
		<Popover
			className="user-nav-item__popover__wrapper"
			visible={isOpen}
			onClose={() => setIsOpen(false)}
			content={<Links onLogout={handleLogout} />}
		>
			<button
				className="nav-item"
				onClick={() => setIsOpen(true)}
				{...((active || isOpen) && { 'data-active': true })}
			>
				{getDisplayName(user)}
			</button>
		</Popover>
	);
}

export default function AuthNavItems() {
	const user = useUser().user;

	if (user) return <UserNavItem user={user} />;

	return (
		<>
			<Navbar.Item
				label="Sign In"
				href="/sign-in"
				urls={['/sign-in']}
				translate
			/>
			<Navbar.Item
				label="Sign Up"
				href="/sign-up"
				urls={['/sign-up']}
				translate
			/>
		</>
	);
}
