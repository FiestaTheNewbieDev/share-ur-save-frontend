import {
	ApiResponse,
	Request,
	RequestOptions,
	RequestResponse,
} from '@/types/requester';
import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
	},
});

const requester = (auth: boolean = false): RequestResponse => {
	let baseOptions: RequestOptions = {};

	if (auth) baseOptions = { withCredentials: true };

	const get: Request = async <T>(
		url: string,
		options?: RequestOptions,
	): Promise<ApiResponse<T>> =>
		API.get<T>(url, { ...baseOptions, ...options });

	const post: Request = async <T>(
		url: string,
		data?: any,
		options?: RequestOptions,
	): Promise<ApiResponse<T>> =>
		API.post<T>(url, data, { ...baseOptions, ...options });

	const put: Request = async <T>(
		url: string,
		data?: any,
		options?: RequestOptions,
	): Promise<ApiResponse<T>> =>
		API.put<T>(url, data, { ...baseOptions, ...options });

	const del: Request = async <T>(
		url: string,
		options?: RequestOptions,
	): Promise<ApiResponse<T>> =>
		API.delete<T>(url, { ...baseOptions, ...options });

	const patch: Request = async <T>(
		url: string,
		data?: any,
		options?: RequestOptions,
	): Promise<ApiResponse<T>> =>
		API.patch<T>(url, data, { ...baseOptions, ...options });

	return { get, post, put, delete: del, patch };
};

export default requester;
