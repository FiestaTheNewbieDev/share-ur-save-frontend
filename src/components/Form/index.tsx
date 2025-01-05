import cn from '@/misc/classNames';
import { HtmlHTMLAttributes } from 'react';
import './style.scss';

type Props = HtmlHTMLAttributes<HTMLFormElement>;

export default function Form({ children, className, ...props }: Props) {
	const classNames = cn(className);

	return (
		<form className={classNames} {...props}>
			{children}
		</form>
	);
}
