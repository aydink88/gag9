import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface User {
  username: string;
  email: string;
  token: string;
}
export interface AuthState {
  error: string;
  isAuth: boolean;
  user: User;
  status: 'idle' | 'loading' | 'failed';
}

const initUser = { username: '', email: '', token: '' };
const userFromStorage: string = localStorage.getItem('user') as string;

const initialState: AuthState = {
  error: '',
  isAuth: false,
  user: userFromStorage ? JSON.parse(userFromStorage) : initUser,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.status = 'idle';
      state.error = '';
      state.user = action.payload;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.status = 'failed';
      state.error = action.payload;
      state.user = initUser;
    },
    registerRequest: (state) => {
      state.status = 'loading';
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.status = 'idle';
      state.error = '';
      state.user = action.payload;
    },
    registerFail: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      state.status = 'failed';
      state.error = action.payload;
      state.user = initUser;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = initUser;
    },
    cleanupErrors: (state) => {
      state.error = '';
    },
  },
});

export const {
  loginRequest,
  registerRequest,
  loginSuccess,
  loginFail,
  registerFail,
  registerSuccess,
  logout,
  cleanupErrors,
} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
