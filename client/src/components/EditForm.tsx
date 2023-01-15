import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../features/hooks';
import { editFormToggle } from '../features/ui/uiSlice';
import { Post } from '../types';
import Modal from './Modal';

const EditForm: FC<{ post: Post }> = ({ post }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    setTitle(post.title ? post.title : '');
    setCategory(post.category ? post.category : '');
  }, [post]);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const form = JSON.stringify({ title, category });
    try {
      const request = await fetch(`/api/posts/${post.id}`, {
        method: 'put',
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') as string).token}`,
          'Content-Type': 'application/json',
        },
        body: form,
      });
      const response = await request.json();
      console.log('Response', response);
      dispatch(editFormToggle(false));
    } catch (err) {
      alert('Error uploading the files');
      console.log('Error uploading the files', err);
    }
  };

  return (
    <Modal onSubmit={handleSubmit}>
      <div className='form-control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='form-control'>
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <button type='submit'>Update</button>
        <button onClick={() => dispatch(editFormToggle(false))}>Cancel</button>
      </div>
    </Modal>
  );
};

export default EditForm;
