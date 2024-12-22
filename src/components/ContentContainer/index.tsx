import cn from '@/misc/classNames';
import './style.scss';

interface IProps {
	className?: string;
	children: React.ReactNode;
}

export default function ContentContainer({ className, children }: IProps) {
	const classNames = cn('content-container', className);

	return <div className={classNames}>{children}</div>;
}
