'use client';

import Backdrop from '@/components/Backdrop';
import Portal from '@/components/Portal';
import classNames from '@/misc/classNames';
import BackdropActions from '@/store/ui/backdrop/actions';
import { ReactNode, useEffect, useState } from 'react';

import './style.scss';

interface IProps {
	id: string;
	className?: string;
	children: ReactNode;
	visible?: boolean;
	onClose: () => void;
}

export default function Modal({
	id,
	className,
	children,
	visible = true,
	onClose,
}: IProps) {
	const [zIndex, setZIndex] = useState(0);

	useEffect(() => {
		if (visible) {
			BackdropActions.push(id);
		} else {
			BackdropActions.remove(id);
		}
	}, [id, visible]);

	return (
		<Portal>
			<Backdrop id={id} onClick={onClose} setZIndex={setZIndex} />
			<div
				className="modal__container"
				{...(visible && { 'data-visible': true })}
				style={{ zIndex: zIndex }}
			>
				<div className={classNames('modal', className)}>{children}</div>
			</div>
		</Portal>
	);
}
