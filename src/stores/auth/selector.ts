import { useSelector } from 'react-redux';

import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/stores/store';

import { IAuthState } from '@/stores/auth/initialState';

const getAuthState = (state: IAuthState): IAuthState => state;

const _useAuth = createSelector(getAuthState, (state) => state);

const useAuth = () => useSelector((state: RootState) => _useAuth(state.auth));

export default useAuth;
