import authService from '@/services/auth';
import axios from 'axios';

const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
});

const SERVICES = {
	auth: authService,
};

export { API };
export default SERVICES;
