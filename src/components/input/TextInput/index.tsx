import cn from '@/misc/classNames';
import getTranslateClass from '@/misc/getTranslateClass';
import { TranslationStatus } from '@/types/weglot';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputHTMLAttributes } from 'react';
import './style.scss';

type Input = InputHTMLAttributes<HTMLInputElement> & {
	type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url';
	startIcon?: IconDefinition;
	startIconOnClick?: () => void;
	endIcon?: IconDefinition;
	endIconOnClick?: () => void;
	full?: boolean;
	translate?: TranslationStatus;
	textarea?:
		| {
				rows?: number;
				resize?: 'none' | 'both' | 'horizontal' | 'vertical';
		  }
		| boolean;
};

export default function TextInput({ translate, ...props }: Input) {
	const classNames = cn(
		'text-input',
		props.className,
		getTranslateClass(translate),
	);

	if (props.textarea)
		return (
			<div
				className={classNames}
				{...(props.full && { 'data-full': true })}
			>
				<textarea
					id={props.id}
					className="text-area"
					placeholder={props.placeholder}
					rows={props.textarea?.rows || 5}
					style={{ resize: props.textarea?.resize || 'none' }}
				/>
			</div>
		);

	return (
		<div className={classNames} {...(props.full && { 'data-full': true })}>
			{props.startIcon && (
				<FontAwesomeIcon
					icon={props.startIcon}
					onClick={props.startIconOnClick}
					className="start-icon"
					{...(props.startIconOnClick && { 'data-clickable': true })}
				/>
			)}
			<input {...props} className="input" />
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
