import { User } from '@/types/users';

export type UserState = {
	user: User;
};

const initialState = {
	user: null,
};

export default initialState;
