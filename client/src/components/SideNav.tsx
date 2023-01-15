import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import AppPortal from '../containers/ReactPortal';

const SideNav: FC<{ isOpened: boolean }> = ({ isOpened }) => {
  return (
    <AppPortal selector="#sidenav-hook">
      <div className={isOpened ? 'sidenav open' : 'sidenav'}>
        <nav className="sidenav__menu">
          <ul>
            <li>
              <i className="fas fa-home"></i>
              <NavLink to="/">Home</NavLink>
              <i className="fas fa-sliders-h"></i>
            </li>
            <li>
              <i className="fas fa-mobile-android"></i>
              <NavLink to="/app">Get 9GAG app</NavLink>
            </li>
            <li>
              <i className="fas fa-trophy"></i>
              <NavLink to="/pro">Get 9GAG PRO</NavLink>
              <i className="fas fa-crown"></i>
            </li>
          </ul>
        </nav>
      </div>
    </AppPortal>
  );
};

export default SideNav;
