import { INavItem } from '@/components/Navbar';
import { faGamepad, faHome } from '@fortawesome/free-solid-svg-icons';

const NAV_ITEMS: INavItem[] = [
	{
		label: 'Home',
		icon: faHome,
		href: '/',
		urls: ['/'],
		spanStyle: {
			display: 'flex',
			gap: 'var(--spacing-xsmall)',
			alignItems: 'baseline',
		},
		translate: true,
	},
	{
		label: 'Games',
		icon: faGamepad,
		href: '/games',
		urls: ['/games', '/game'],
		spanStyle: {
			display: 'flex',
			gap: 'var(--spacing-xsmall)',
			alignItems: 'center',
		},
		translate: true,
	},
];

export default NAV_ITEMS;
