import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { RootState } from '../store';

interface PostsState {
  status: 'idle' | 'loading' | 'fail';
  error: string;
  posts: Post[];
  activePostId?: string;
}

const initialState: PostsState = { status: 'idle', error: '', posts: [] };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsRequest: (state) => {
      state.status = 'loading';
    },
    getPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.status = 'idle';
      state.posts = action.payload;
      state.error = '';
    },
    getPostsFail: (state, action: PayloadAction<string>) => {
      state.status = 'fail';
      state.posts = [];
      state.error = action.payload;
    },
    setActivePost: (state, action: PayloadAction<string>) => {
      state.activePostId = action.payload;
    },
  },
});

export const { getPostsRequest, getPostsSuccess, getPostsFail, setActivePost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
