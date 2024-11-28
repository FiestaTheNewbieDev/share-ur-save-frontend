'use client';

import { User } from '@/types/users';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IRootContext {
	auth: {
		user: User;
		setUser: (user: User) => void;
	};
	navbar: {
		isOpen: boolean;
		setNavOpen: (isOpen: boolean) => void;
		toggleNavbar: () => void;
	};
}

const RootContext = createContext<IRootContext>({} as IRootContext);

function RootContextProvider({
	userFromServer,
	children,
}: {
	userFromServer: User;
	children: ReactNode;
}) {
	const [user, setUser] = useState<User>(userFromServer || null);
	const [isOpen, setNavOpen] = useState<boolean>(false);

	const value = {
		auth: {
			user,
			setUser,
		},
		navbar: {
			isOpen,
			setNavOpen,
			toggleNavbar: () => setNavOpen(!isOpen),
		},
	};

	return (
		<RootContext.Provider value={value}>{children}</RootContext.Provider>
	);
}

function useUser() {
	return useContext(RootContext).auth.user;
}

function useNavbar() {
	return useContext(RootContext).navbar;
}

export { RootContext, RootContextProvider, useNavbar, useUser };
