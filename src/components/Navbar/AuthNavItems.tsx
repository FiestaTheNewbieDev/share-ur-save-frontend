'use client';

import SERVICES from '@/services';
import { User } from '@/types/users';
import Modal from '@components/Modal';
import Navbar from '@components/Navbar';
import Popover from '@components/Popover';
import useBreakpoint from '@hooks/client/useBreakpoint';
import BREAKPOINTS from '@misc/breakpoints';
import UserActions from '@store/user/actions';
import useUser from '@store/user/selector';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function UserNavItem({ user }: { user: User }) {
	const [isOpen, setIsOpen] = useState(false);
	const [active, setActive] = useState(false);
	const pathname = usePathname();
	const breakpoint = useBreakpoint();
	const router = useRouter();

	const urls = ['/account'];

	function handleLogout() {
		SERVICES.auth.signOut().then(() => {
			UserActions.clearUser();
			router.replace('/sign-in');
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
					{user!.displayName || user!.username}
				</button>
				<Modal
					id="user-nav-item"
					className="user-nav-item__modal"
					visible={isOpen}
					onClose={() => setIsOpen(false)}
				>
					<div className="links">
						<Link className="link weglot-translate" href="/account">
							Account
						</Link>
					</div>
					<button
						className="link weglot-translate"
						onClick={handleLogout}
					>
						Logout
					</button>
				</Modal>
			</>
		);

	return (
		<Popover
			className="user-nav-item__popover__wrapper"
			visible={isOpen}
			onClose={() => setIsOpen(false)}
			content={
				<>
					<div className="links">
						<Link className="link weglot-translate" href="/account">
							Account
						</Link>
					</div>
					<button
						className="link weglot-translate"
						onClick={handleLogout}
					>
						Logout
					</button>
				</>
			}
		>
			<button
				className="nav-item"
				onClick={() => setIsOpen(true)}
				{...((active || isOpen) && { 'data-active': true })}
			>
				<span>{user!.displayName || user!.username}</span>
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
