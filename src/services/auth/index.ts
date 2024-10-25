import requester from '@/services/requester';
import { ApiResponse } from '@/types/requester';
import { User } from '@/types/users';

const BASE_URL = '/auth';

type AuthService = {
	signUp: typeof signUp;
	signIn: typeof signIn;
	signOut: typeof signOut;
	fetchUser: typeof fetchUser;
};

export async function signUp(data: {
	username: string;
	email: string;
	password: string;
}): Promise<ApiResponse<{ user: User }>> {
	return requester(true).post<{ user: User }>(`${BASE_URL}/sign-up`, data);
}

export async function signIn(data: {
	login: string;
	password: string;
}): Promise<ApiResponse<{ user: User }>> {
	return requester(true).post<{ user: User }>(`${BASE_URL}/sign-in`, data);
}

export async function signOut(): Promise<ApiResponse<{ user: User }>> {
	return requester(true).post<{ user: User }>(`${BASE_URL}/sign-out`);
}

export async function fetchUser(
	session_id?: string,
): Promise<ApiResponse<{ user: User }>> {
	return requester(true).get<{ user: User }>(
		`${BASE_URL}/user`,
		session_id
			? {
					headers: {
						Cookie: `session_id=${session_id}`,
					},
				}
			: undefined,
	);
}

const authService: AuthService = {
	signUp,
	signIn,
	signOut,
	fetchUser,
};

export default authService;
