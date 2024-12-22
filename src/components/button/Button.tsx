import classNames from '@/misc/classNames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import './style.scss';

type Button = ButtonHTMLAttributes<HTMLButtonElement> & {
	circular?: boolean;
	full?: boolean;
	variant?: 'primary' | 'outline' | 'transparent';
};

export default function Button({
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
