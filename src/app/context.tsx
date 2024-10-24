'use client';

import { User } from '@/types/user';
import { createContext, ReactNode, useContext, useState } from 'react';

interface IRootContext {
	user: User | null;
	setUser: (user: User) => void;
}

const RootContext = createContext<IRootContext>({} as IRootContext);

function RootContextProvider({
	userFromServer,
	children,
}: {
	userFromServer: User | null;
	children: ReactNode;
}) {
	const [user, setUser] = useState<User | null>(userFromServer || null);

	const value = {
		user,
		setUser,
	};

	return (
		<RootContext.Provider value={value}>{children}</RootContext.Provider>
	);
}

function useUser() {
	return useContext(RootContext).user;
}

export { RootContext, RootContextProvider, useUser };
