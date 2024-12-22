interface Weglot {
	initialize: (options: {
		api_key: string;
		whitelist?: { value: string }[];
		cache?: boolean;
	}) => void;
}

interface Window {
	Weglot?: Weglot;
}
