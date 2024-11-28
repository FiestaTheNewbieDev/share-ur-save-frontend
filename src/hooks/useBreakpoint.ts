import BREAKPOINTS from '@/misc/breakpoints';
import { useEffect, useState } from 'react';

export default function useBreakpoint() {
	const [width, setWidth] = useState<number>(window.innerWidth);

	function getBreakpoint(width: number) {
		let current = 'MOBILE_S';

		for (const [key, value] of Object.entries(BREAKPOINTS)) {
			if (width < value) return current;
			current = key;
		}

		return current;
	}

	useEffect(() => {
		const handleResize = () => {
			const newWidth = window.innerWidth;
			setWidth(newWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return { width, breakpoint: getBreakpoint(width) };
}