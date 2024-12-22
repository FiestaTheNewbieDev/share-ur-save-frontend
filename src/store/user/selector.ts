import { RootState } from '@/store/store';
import { UserState } from '@/store/user/initialState';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const getUserState = (state: UserState): UserState => state;

const _useUser = createSelector(getUserState, (state) => state);

const useUser = () => useSelector((state: RootState) => _useUser(state.user));

export default useUser;
