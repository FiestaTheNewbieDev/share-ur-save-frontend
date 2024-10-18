'use client';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface INavItemAbstract {
	className?: string;
	href: string;
	urls: string[];
}

interface INavItemSimple extends INavItemAbstract {
	label: string;
	i18nkey?: string;
	icon?: IconDefinition;
	spanClassName?: string;
}

interface INavItemWrapper extends INavItemAbstract {
	children?: React.ReactNode;
}

export type INavItem = INavItemSimple | INavItemWrapper;

export default function NavItem(props: INavItem) {
	const [isActive, setIsActive] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		if (props.urls)
			setIsActive(
				props.urls.some(
					(url) => pathname === url || pathname.startsWith(`${url}/`),
				),
			);
	}, [pathname, props.urls]);

	return (
		<Link
			href={props.href}
			className={classNames(
				'flex items-center gap-1 px-4 text-lg font-semibold transition-colors duration-300 ease-in-out hover:bg-anthracite hover:text-white active:bg-anthracite active:text-white',
				isActive && 'bg-anthracite !text-white',
				props.className,
			)}
		>
			{'label' in props && (
				<span className={props.spanClassName}>
					{props.icon && <FontAwesomeIcon icon={props.icon} />}
					{props.label}
				</span>
			)}
			{'children' in props && props.children}
		</Link>
	);
}
