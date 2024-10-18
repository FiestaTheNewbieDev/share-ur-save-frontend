import axios from 'axios';
import Cookies from 'js-cookie';

export const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${Cookies.get('token')}`,
	},
	withCredentials: true,
});

export const RAWG = axios.create({
	baseURL: 'https://api.rawg.io/api',
	headers: {
		Accept: 'application/json',
	},
});
