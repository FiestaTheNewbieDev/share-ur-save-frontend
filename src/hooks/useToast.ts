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

type titleT = (() => React.ReactNode) | React.ReactNode;
const useToast = () => {
	const success = (message: titleT | React.ReactNode) =>
		toast.success(message);
	const info = (message: titleT | React.ReactNode) => toast.info(message);
	const warning = (message: titleT | React.ReactNode) =>
		toast.warning(message);
	const error = (message: titleT | React.ReactNode) => toast.error(message);
	const message = (message: titleT | React.ReactNode) =>
		toast.message(message);
	const loading = (message: titleT | React.ReactNode) =>
		toast.loading(message);

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
