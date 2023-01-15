import { FC, useEffect } from 'react';
import PostSingle from '../components/PostSingle';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { fetchPosts } from '../features/posts/postsActions';

const Posts: FC = () => {
  const { status, posts, error } = useAppSelector((state) => state.posts);
  const uiState = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('useeffect - fetching posts');
    dispatch(fetchPosts());
  }, [dispatch, uiState.isUploadFormOpen]);

  return (
    <div className='posts'>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error occurred</p>}
      {posts.length > 0 && posts.map((post) => <PostSingle key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
