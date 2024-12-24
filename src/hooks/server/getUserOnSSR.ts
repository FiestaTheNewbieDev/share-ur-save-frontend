'use server';

import { User } from '@/types/users';
import { headers } from 'next/headers';

const getUserOnSSR = async (): Promise<User> => {
	let user: User = null;
	const userHeader = (await headers()).get('X-User-Info');

	if (userHeader) {
		user = JSON.parse(atob(userHeader));
	}

	return user;
};

export default getUserOnSSR;
