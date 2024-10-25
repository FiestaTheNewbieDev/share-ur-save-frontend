import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type RequestResponse = {
	get: Request;
	post: Request;
	put: Request;
	delete: Request;
	patch: Request;
};

export type RequestOptions = AxiosRequestConfig;

export type Request = <T = any>(
	url: string,
	data?: any,
	options?: RequestOptions,
) => Promise<ApiResponse<T>>;

export type ApiResponse<T = any, D = any> =
	| SuccessResponse<T, D>
	| ErrorResponse<T, D>
	| AxiosResponse<T, D>;

export type SuccessResponse<T = any, D = any> = AxiosResponse<T, D> & {
	status: 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;
	data: T;
};

export type ErrorResponse<T = any, D = any> = AxiosResponse<T, D> & {
	status:
		| 400
		| 401
		| 402
		| 403
		| 404
		| 405
		| 406
		| 407
		| 408
		| 409
		| 410
		| 411
		| 412
		| 413
		| 414
		| 415
		| 416
		| 417
		| 418
		| 421
		| 422
		| 423
		| 424
		| 425
		| 426
		| 428
		| 429
		| 431
		| 451
		| 500
		| 501
		| 502
		| 503
		| 504
		| 505
		| 506
		| 507
		| 508
		| 510
		| 511;
	data: RequestError;
};
export type RequestError = {
	message?: string | string[];
	error: string;
	statusCode: number;
};
