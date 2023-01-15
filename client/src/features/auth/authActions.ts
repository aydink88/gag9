import { Credentials } from '../../types';
import { AppThunk } from '../store';
import {
  loginFail,
  loginRequest,
  loginSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
} from './authSlice';

export const authenticateAsync =
  (creds: Credentials): AppThunk =>
  async (dispatch) => {
    if (!creds) return;
    dispatch(loginRequest());
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      const responseBody = await res.json();
      console.log(responseBody);

      if (responseBody.data) {
        localStorage.setItem('user', JSON.stringify(responseBody.data));

        dispatch(loginSuccess(responseBody.data));
      } else {
        localStorage.removeItem('user');
        if (responseBody.error) {
          dispatch(loginFail(responseBody.error));
        } else {
          dispatch(loginFail('Failed'));
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFail('something wrong'));
    }
  };

export const registerAsync =
  (creds: Credentials): AppThunk =>
  async (dispatch) => {
    if (!creds) return;
    dispatch(registerRequest());
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
      });
      const responseBody = await res.json();
      console.log(responseBody);

      if (responseBody.data) {
        localStorage.setItem('user', JSON.stringify(responseBody.data));

        dispatch(registerSuccess(responseBody.data));
      } else {
        localStorage.removeItem('user');
        if (responseBody.error) {
          dispatch(registerFail(responseBody.error));
        } else {
          dispatch(registerFail('Failed'));
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFail('something wrong'));
    }
  };
