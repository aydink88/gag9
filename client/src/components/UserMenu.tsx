import { FC } from 'react';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { userMenuToggle } from '../features/ui/uiSlice';
import AppPortal from '../containers/ReactPortal';

const UserMenu: FC = () => {
  const uiState = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  return (
    <AppPortal selector="#usermenu-hook">
      <div className={uiState.isUserMenuOpen ? 'usermenu show' : 'usermenu'}>
        <button
          className="logout-btn"
          onClick={() => {
            dispatch(logout());
            dispatch(userMenuToggle(false));
          }}
        >
          Log out
        </button>
        <button onClick={() => dispatch(userMenuToggle(false))}>Close Menu</button>
      </div>
    </AppPortal>
  );
};

export default UserMenu;
