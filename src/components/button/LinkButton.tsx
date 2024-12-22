import classNames from '@/misc/classNames';
import { AnchorHTMLAttributes, ReactNode } from 'react';

import Link from 'next/link';
import './style.scss';

type LinkButton = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
	href: string;
	circular?: boolean;
	variant?: 'outline' | 'transparent';
};

export default function LinkButton({
	className,
	href,
	children,
	variant = 'outline',
	...props
}: { children: ReactNode } & LinkButton) {
	return (
		<Link
			{...props}
			href={href}
			className={classNames('link-button', className)}
			{...(props.circular && { 'data-circular': true })}
			data-variant={variant}
		>
			{children}
		</Link>
	);
}
