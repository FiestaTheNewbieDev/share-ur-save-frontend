import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { HTMLInputAutoCompleteAttribute, InputHTMLAttributes } from 'react';

interface IProps {
	className?: string;
	ref?: React.Ref<HTMLInputElement>;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder?: string;
	value?: any;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	autoComplete?: HTMLInputAutoCompleteAttribute;
	startIcon?: IconDefinition;
	startIconOnClick?: () => void;
	endIcon?: IconDefinition;
	endIconOnClick?: () => void;
}

export default function Input(props: IProps) {
	return (
		<div className="relative flex items-center">
			{props.startIcon && (
				<FontAwesomeIcon
					icon={props.startIcon}
					onClick={props.startIconOnClick}
					className={classNames(
						'pointer-events-none absolute ml-2',
						props.startIconOnClick && 'cursor-pointer',
					)}
				/>
			)}
			<input
				className={classNames(
					'w-full rounded-lg border border-neutral-200 py-1 px-2 focus:outline-none',
					props.startIcon && 'pl-8',
					props.endIcon && 'pr-8',
					props.className,
				)}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				autoComplete={props.autoComplete}
			/>
			{props.endIcon && props.endIconOnClick ? (
				<button
					className="absolute right-2"
					type="button"
					onClick={props.endIconOnClick}
				>
					<FontAwesomeIcon icon={props.endIcon} />
				</button>
			) : (
				props.endIcon && (
					<FontAwesomeIcon
						icon={props.endIcon}
						className="pointer-events-none absolute right-2"
					/>
				)
			)}
		</div>
	);
}
