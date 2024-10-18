import { API } from '@/services/ServiceHelper';

export async function signUp(data: {
	username: string;
	email: string;
	password: string;
}) {
	return API.post('/auth/sign-up', data);
}

export async function signIn(data: { login: string; password: string }) {
	return API.post('/auth/sign-in', data);
}

export async function signOut() {
	return API.post('/auth/sign-out');
}
