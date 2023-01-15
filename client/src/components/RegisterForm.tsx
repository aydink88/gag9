import { FC, FormEvent, useState } from 'react';
import { registerAsync } from '../features/auth/authActions';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { registerFormToggle } from '../features/ui/uiSlice';
import Backdrop from './Backdrop';
import Modal from './Modal';

const RegisterForm: FC = () => {
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerAsync({ username, email, password }));
  };
  return (
    <>
      <Modal header='Register' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-buttons'>
          <button type='submit'>Register</button>
          <button onClick={() => dispatch(registerFormToggle(false))}>Cancel</button>
        </div>
        {error && <p className='error'>{error}</p>}
      </Modal>
      <Backdrop onClick={() => dispatch(registerFormToggle(false))} show={true} />
    </>
  );
};

export default RegisterForm;
