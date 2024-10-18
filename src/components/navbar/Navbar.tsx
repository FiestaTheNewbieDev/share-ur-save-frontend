'use client';

import NavItem, { INavItem } from '@/components/navbar/NavItem';
import Popover from '@/components/popover';
import Searchbar from '@/components/Searchbar';
import { AuthActions } from '@/stores/auth/actions';
import useAuth from '@/stores/auth/selector';
import IUser from '@/types/IUser';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
	faBars,
	faGamepad,
	faHome,
	faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

const navItems: INavItem[] = [
	{
		label: 'Home',
		href: '/',
		urls: ['/'],
		icon: faHome,
		spanClassName: 'flex gap-2 items-baseline',
	},
	{
		label: 'Games',
		href: '/',
		urls: [],
		icon: faGamepad,
		spanClassName: 'flex gap-2 items-center',
	},
];

function AuthPopover({ user, show }: { user: IUser; show: boolean }) {
	function handleSignOut() {
		toast.promise(AuthActions.signOut(), {
			loading: 'Signing out...',
			success: 'Signed out',
			error: (error) => {
				if (error.message.includes('__')) {
					const errorMessages = error.message.split('__').reverse();
					for (let i = 1; i < errorMessages.length; i++)
						toast.error(errorMessages[i]);

					return errorMessages[0];
				} else {
					return error.message;
				}
			},
		});
	}

	return (
		<Popover className="w-48" position="bottom" show={show}>
			<div className="text-base mt-2 font-normal box-border shadow-lg">
				{/* <div className="bg-anthracite text-white py-2 px-4 flex items-center gap-4">
					<Image
						width={32}
						height={32}
						src="https://placehold.co/600x600/png"
						alt=""
						className="rounded-full"
					/>
					{user.displayName || user.username}
				</div> */}
				<div className="bg-white text-black p-2 flex flex-col">
					<Link
						href=""
						className="px-4 py-1 hover:bg-slate-100 rounded-md"
					>
						Profile
					</Link>
					<Link
						href=""
						className="px-4 py-1 hover:bg-slate-100 rounded-md"
						onClick={handleSignOut}
					>
						Sign Out
					</Link>
				</div>
			</div>
		</Popover>
	);
}

function AuthNavItems() {
	const { user } = useAuth();

	const [showPopover, setShowPopover] = useState<boolean>(false);

	if (user) {
		return (
			<div
				className="relative"
				onMouseEnter={() => setShowPopover(true)}
				onMouseLeave={() => setShowPopover(false)}
			>
				<NavItem className="h-full" href="" urls={[]}>
					<span className="flex gap-2 items-center">
						{user.displayName || user.username}
						<Image
							className="rounded-full"
							width={24}
							height={24}
							alt=""
							src="https://placehold.co/600x600/png"
						/>
					</span>
				</NavItem>
				<AuthPopover show={showPopover} user={user} />
			</div>
		);
	}

	return (
		<>
			<NavItem label="Sign In" href="/sign-in" urls={['/sign-in']} />
			<NavItem label="Sign Up" href="/sign-up" urls={['/sign-up']} />
		</>
	);
}

export default function Navbar() {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<nav className="sticky top-0 z-20 w-screen bg-white shadow-lg">
			<div className="mx-auto flex max-w-screen-xl justify-between px-4">
				<Link
					href="/"
					className="flex items-center bg-brand_red p-4 text-white"
				>
					<FontAwesomeIcon icon={faGamepad} size="2xl" />
				</Link>
				<div className="hidden flex-1 md:flex">
					<Searchbar />
					<div className="flex">
						{navItems.map((item, index) => (
							<NavItem key={index} {...item} />
						))}
						<AuthNavItems />
					</div>
				</div>
				<button
					className="my-auto inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm md:hidden"
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? (
						<FontAwesomeIcon icon={faBars} />
					) : (
						<FontAwesomeIcon icon={faX} />
					)}
				</button>
			</div>
		</nav>
	);
}
