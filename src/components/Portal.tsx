'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
	id?: string;
	children: ReactNode;
}

export default function Portal({ id, children }: IProps) {
	const [target, setTarget] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const targetElement = id ? document.getElementById(id) : document.body;
		setTarget(targetElement);
	}, [id]);

	if (!target) return null;

	return createPortal(children, target);
}
