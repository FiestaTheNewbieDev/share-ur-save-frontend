'use client';

import { useEffect } from 'react';

export default function WeglotInitializer() {
	function loadScript(src: string, callback: () => void) {
		const script = document.createElement('script');
		script.src = src;
		script.async = true;
		script.onload = callback;
		document.body.appendChild(script);
	}

	function initialize() {
		window.Weglot!.initialize({
			api_key: 'wg_54fd19b14b26264a17a7967d78fa81a04',
			whitelist: [{ value: '.weglot-translate' }],
		});
	}

	useEffect(() => {
		if (typeof window.Weglot === 'undefined') {
			loadScript('https://cdn.weglot.com/weglot.min.js', initialize);
		} else {
			initialize();
		}
	}, []);

	return null;
}
