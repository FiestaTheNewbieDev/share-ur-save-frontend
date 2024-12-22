'use client';

import classNames from '@/misc/classNames';

import BackdropActions from '@/store/ui/backdrop/actions';
import useBackdrop from '@/store/ui/backdrop/selector';
import { useEffect, useState } from 'react';
import './style.scss';

interface IProps {
	id: string;
	className?: string;
	onClick: () => void;
	setZIndex: (zIndex: number) => void;
}

export default function Backdrop({
	id,
	className,
	onClick,
	setZIndex,
}: IProps) {
	const [zIndex, setThisZIndex] = useState(0);
	const [isTop, setIsTop] = useState(false);

	const stack = useBackdrop().stack;

	useEffect(() => {
		setIsTop(BackdropActions.isTop(id));
		setThisZIndex(BackdropActions.getZIndex(id));
		setZIndex(BackdropActions.getZIndex(id) + 5);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, stack]);

	return (
		<div
			className={classNames('backdrop', className)}
			style={{ zIndex }}
			onClick={onClick}
			{...(isTop && {
				'data-visible': true,
			})}
		/>
	);
}
