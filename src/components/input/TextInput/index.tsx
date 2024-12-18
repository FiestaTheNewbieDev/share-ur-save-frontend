import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLInputAutoCompleteAttribute, InputHTMLAttributes } from 'react';
import './style.scss';

type Input = {
	id?: string;
	className?: string;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	placeholder?: string;
	value?: any;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	autoComplete?: HTMLInputAutoCompleteAttribute;
	startIcon?: IconDefinition;
	startIconOnClick?: () => void;
	endIcon?: IconDefinition;
	endIconOnClick?: () => void;
	full?: boolean;
} & {};

export default function TextInput(props: Input) {
	return (
		<div
			className={`text-input ${props.className}`}
			{...(props.full && { 'data-full': true })}
		>
			{props.startIcon && (
				<FontAwesomeIcon
					icon={props.startIcon}
					onClick={props.startIconOnClick}
					className="start-icon"
					{...(props.startIconOnClick && { 'data-clickable': true })}
				/>
			)}
			<input
				id={props.id}
				className={props.className}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				autoComplete={props.autoComplete}
			/>
			{props.endIcon && (
				<FontAwesomeIcon
					icon={props.endIcon}
					onClick={props.endIconOnClick}
					className="end-icon"
					{...(props.endIconOnClick && { 'data-clickable': true })}
				/>
			)}
		</div>
	);
}
