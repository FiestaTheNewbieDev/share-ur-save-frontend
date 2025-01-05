'use client';

import cn from '@/misc/classNames';
import getTranslateClass from '@/misc/getTranslateClass';
import { TranslationStatus } from '@/types/weglot';
import { toast } from 'sonner';

type PromiseTResult<Data = any> =
	| string
	| React.ReactNode
	| ((
			data: Data,
	  ) => React.ReactNode | string | Promise<React.ReactNode | string>);
type PromiseData<T = any> = {
	loading?: string | React.ReactNode;
	success?: PromiseTResult<T>;
	error?: PromiseTResult;
	description?: PromiseTResult;
	finally?: () => void | Promise<void>;
};

type Params = { className?: string; translate?: TranslationStatus };

type titleT = (() => React.ReactNode) | React.ReactNode;
const useToast = () => {
	const showToast = (
		type: 'success' | 'info' | 'warning' | 'error' | 'message' | 'loading',
		message: titleT | React.ReactNode,
		params?: Params,
	) => {
		const classNames = cn(
			getTranslateClass(params?.translate),
			params?.className,
		);

		return toast[type](message, { className: classNames });
	};

	const success = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('success', message, params);
	const info = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('info', message, params);
	const warning = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('warning', message, params);
	const error = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('error', message, params);
	const message = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('message', message, params);
	const loading = (message: titleT | React.ReactNode, params?: Params) =>
		showToast('loading', message, params);

	const promise = <T = unknown>(
		promise: Promise<T>,
		data?: PromiseData<T>,
	) => {
		return toast.promise(promise, {
			loading: data?.loading,
			success: data?.success,
			error: data?.error,
			description: data?.description,
			finally: data?.finally,
		});
	};

	return { success, info, warning, error, message, loading, promise };
};

export default useToast;
