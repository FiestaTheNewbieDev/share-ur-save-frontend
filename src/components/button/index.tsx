import classNames from '@/misc/classNames';
import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './style.scss';

type ExtraProps = {
	full?: boolean;
	circular?: boolean;
	variant?: 'primary' | 'outline' | 'transparent';
};

type LinkButton = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
	href: string;
} & ExtraProps;

export function LinkButton({
	className,
	href,
	children,
	variant = 'outline',
	full,
	...props
}: { children: ReactNode } & LinkButton) {
	return (
		<Link
			{...props}
			href={href}
			className={classNames('link-button', className)}
			{...(props.circular && { 'data-circular': true })}
			data-variant={variant}
			{...(full && { 'data-full': true })}
		>
			{children}
		</Link>
	);
}

type Button = ButtonHTMLAttributes<HTMLButtonElement> & ExtraProps;

export function Button({
	children,
	full,
	variant = 'outline',
	...props
}: { children: ReactNode } & Button) {
	return (
		<button
			{...props}
			className={classNames('button', props.className)}
			{...(props.circular && { 'data-circular': true })}
			data-variant={variant}
			{...(full && { 'data-full': true })}
		>
			{children}
		</button>
	);
}
