import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { cleanupErrors } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import {
  loginFormToggle,
  registerFormToggle,
  sidenavToggle,
  uploadFormToggle,
  userMenuToggle,
} from "../features/ui/uiSlice";
import Backdrop from "./Backdrop";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import SideNav from "./SideNav";
import UploadForm from "./UploadForm";
import UserMenu from "./UserMenu";

const Navbar: FC = () => {
  const { isRegisterFormOpen, isLoginFormOpen, isSidenavOpen, isUploadFormOpen, isUserMenuOpen } =
    useAppSelector((state) => state.ui);
  const { token } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("navbar useeffect");
    dispatch(cleanupErrors());
    if (token) {
      dispatch(registerFormToggle(false));
      dispatch(loginFormToggle(false));
    }
  }, [dispatch, isRegisterFormOpen, isLoginFormOpen, token]);

  return (
    <>
      <div className="header__navbar">
        <div className="header__navbar--left">
          <i
            className="fas fa-bars fa-2x"
            onClick={() => dispatch(sidenavToggle(!isSidenavOpen))}
            style={{ cursor: "pointer" }}
          ></i>
          <Link to="/">
            <img className="header__logo" src="/images/logo.png" alt="9gag-logo" />
          </Link>
        </div>
        {token ? (
          <div className="header__navbar--right">
            <i
              className="fas fa-upload fa-2x"
              onClick={() => dispatch(uploadFormToggle(!isUploadFormOpen))}
            ></i>
            <i className="fas fa-bell fa-2x"></i>
            <i className="fas fa-search fa-2x"></i>
            <div onClick={() => dispatch(userMenuToggle(!isUserMenuOpen))}>
              <img className="header__nav-avatar" src="/images/avatar.jpg" alt="avatar" />
            </div>
          </div>
        ) : (
          <div className="header__navbar--right">
            <button onClick={() => dispatch(loginFormToggle(!isLoginFormOpen))}>Login</button>
            <button
              className="inverse"
              onClick={() => dispatch(registerFormToggle(!isRegisterFormOpen))}
            >
              Signup
            </button>
          </div>
        )}
      </div>
      <SideNav isOpened={isSidenavOpen} />
      {isRegisterFormOpen && <RegisterForm />}
      {isLoginFormOpen && <LoginForm />}
      {isSidenavOpen && (
        <Backdrop show={isSidenavOpen} onClick={() => dispatch(sidenavToggle(!isSidenavOpen))} />
      )}
      <UserMenu />
      {isUploadFormOpen && <UploadForm />}
    </>
  );
};

export default Navbar;
