'use client';

import classNames from '@/misc/classNames';
import { useEffect, useRef } from 'react';
import './style.scss';

interface IProps {
	className?: string;
	children: React.ReactNode;
	content: React.ReactNode;
	visible: boolean;
	onClose: () => void;
}

export default function Popover({
	className,
	children,
	content,
	visible,
	onClose,
}: IProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose();
			}
		};

		if (visible) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [visible, onClose]);

	return (
		<div className={classNames('popover__wrapper', className)} ref={ref}>
			{children}
			<div className="popover" {...(visible && { 'data-visible': true })}>
				{content}
			</div>
		</div>
	);
}
