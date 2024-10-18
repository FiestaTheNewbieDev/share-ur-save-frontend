import classNames from 'classnames';
import './style.scss';

interface IProps {
	className?: string;
	children: React.ReactNode;
	show?: boolean;
	inherit?: boolean;
	position: 'top' | 'bottom' | 'left' | 'right';
}

export default function Popover(props: IProps) {
	return (
		<div
			className={classNames('popover', props.className)}
			data-position={props.position}
			data-visible={props.show}
		>
			{props.children}
		</div>
	);
}
