import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postsReducer from './posts/postsSlice';
import uiReducer from './ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
