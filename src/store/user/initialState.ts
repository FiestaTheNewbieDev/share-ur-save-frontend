import { User } from '@/types/users';

export type UserState = {
	user: User | null;
};

const initialState: UserState = {
	user: null,
};

export default initialState;
