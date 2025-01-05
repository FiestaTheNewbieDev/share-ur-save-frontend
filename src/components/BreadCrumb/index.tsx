import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import './style.scss';

type BreadCrumbItem = {
	label: string;
	href: string;
};

export default function Breadcrumb({ items }: { items: BreadCrumbItem[] }) {
	return (
		<nav aria-label="breadcrumb" className="breadcrumb">
			{items.map((item, index) => (
				<>
					{index > 0 && (
						<FontAwesomeIcon
							className="chevron"
							icon={faChevronRight}
						/>
					)}
					<Link href={item.href}>{item.label}</Link>
				</>
			))}
		</nav>
	);
}
