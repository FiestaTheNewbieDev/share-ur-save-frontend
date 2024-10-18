import type FetchErrorType from '@/types/FetchErrorType';
import IUser from '@/types/IUser';

export interface IAuthState {
	fetching: boolean;
	fetchError: FetchErrorType;
	user: IUser | null;
}

const initialState: IAuthState = {
	fetching: false,
	fetchError: null,
	user: null,
};

export default initialState;
