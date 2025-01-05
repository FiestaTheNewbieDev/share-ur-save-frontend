import cn from '@/misc/classNames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	Children,
	ComponentPropsWithoutRef,
	CSSProperties,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react';
import './style.scss';

export type Tabs<TabName extends string> = React.PropsWithChildren<{
	className?: string;
	selected: TabName;
	onTab?: (tabName: TabName) => void;
	shallow?: boolean;
}>;

export default function Tabs<TabName extends string>({
	className,
	children,
	selected,
	onTab,
	shallow,
}: Tabs<TabName>) {
	const classNames = cn('tabs', className);
	const tabsRef = useRef<HTMLDivElement>(null);
	const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});

	useEffect(() => {
		if (!tabsRef.current) return;

		const observer = new ResizeObserver(() => {
			updateIndicator();
		});

		tabsRef.current
			.querySelectorAll<HTMLDivElement>('[data-selected]')
			.forEach((tab) => {
				observer.observe(tab);
			});

		return () => {
			observer.disconnect();
		};
	}, [selected]);

	function updateIndicator() {
		if (!tabsRef.current) return;

		const selectedTab =
			tabsRef.current.querySelector<HTMLDivElement>('[data-selected]');

		if (selectedTab) {
			const { offsetLeft, offsetWidth } = selectedTab;
			setIndicatorStyle({
				left: offsetLeft,
				width: offsetWidth,
			});
		}
	}

	useEffect(() => {
		updateIndicator();
	}, [selected]);

	return (
		<div className={classNames} ref={tabsRef}>
			<div className="tabs__indicator" style={indicatorStyle} />
			{Children.map(children, (tab) => {
				if (!tab || typeof tab !== 'object') return tab;

				const element = tab as ReactElement;
				const name = element.props.name ? element.props.name : '';

				return (
					<Tabs.Item
						{...element.props}
						selected={selected === name}
						onClick={() => onTab && onTab(name)}
						{...(shallow && { shallow })}
					/>
				);
			})}
		</div>
	);
}

Tabs.displayName = 'Tabs';

type Tab = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
	name: string;
	href?: string;
	selected?: boolean;
	disabled?: boolean;
	shallow?: boolean;
};

function TabItem({
	className,
	onClick,
	href,
	selected,
	disabled,
	shallow,
	...props
}: Tab) {
	const classNames = cn('tabs__tab-item', className);

	const router = useRouter();

	function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();

		onClick && onClick(event);

		if (href && shallow) router.push(href, undefined, { shallow: true });
		else if (href) router.push(href);
	}

	if (!href || disabled) {
		return (
			<a
				{...props}
				className={classNames}
				onClick={handleClick}
				data-disabled
			></a>
		);
	}

	return (
		<Link
			href={href}
			className={classNames}
			onClick={handleClick}
			{...props}
			{...(selected && { 'data-selected': true })}
		/>
	);
}

Tabs.Item = TabItem;
Tabs.Item.displayName = 'Tabs.Item';
