import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const Tabbar: FC = () => {
  return (
    <div className='tabbar'>
      <NavLink to='/hot'>Hot</NavLink>
      <NavLink to='/trending'>Trending</NavLink>
      <NavLink to='/fresh'>Fresh</NavLink>
    </div>
  );
};

export default Tabbar;
