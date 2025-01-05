'use client';

import UserActions from '@/store/user/actions';
import { User } from '@/types/users';
import { useEffect } from 'react';

interface IProps {
	user: User | null;
}

export default function UserS2CGateway({ user }: IProps) {
	useEffect(() => {
		UserActions.setUser(user);
	}, [user]);

	return null;
}
