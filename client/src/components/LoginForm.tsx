import { FC, FormEventHandler, useState } from 'react';
import { authenticateAsync } from '../features/auth/authActions';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { loginFormToggle } from '../features/ui/uiSlice';
import Backdrop from './Backdrop';
import Modal from './Modal';

const LoginForm: FC = () => {
  const error = useAppSelector((state) => state.auth.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(authenticateAsync({ email, password }));
  };

  return (
    <>
      <Modal header='Login' onSubmit={handleSubmit}>
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
          <button type='submit'>Login</button>
          <button onClick={() => dispatch(loginFormToggle(false))}>Cancel</button>
        </div>
        {error && <p className='error'>{error}</p>}
      </Modal>
      <Backdrop onClick={() => dispatch(loginFormToggle(false))} show={true} />
    </>
  );
};

export default LoginForm;
