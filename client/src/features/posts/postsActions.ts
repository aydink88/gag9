import { AppThunk } from '../store';
import { getPostsFail, getPostsRequest, getPostsSuccess } from './postsSlice';

export const fetchPosts = (): AppThunk => async (dispatch) => {
  dispatch(getPostsRequest());
  try {
    const res = await fetch('/api/posts');
    const responseBody = await res.json();
    if (responseBody.data) {
      dispatch(getPostsSuccess(responseBody.data));
    } else {
      dispatch(getPostsFail('Failed'));
    }
  } catch (err) {
    dispatch(getPostsFail('something went wrong'));
  }
};
