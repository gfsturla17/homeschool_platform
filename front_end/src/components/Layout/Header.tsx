import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from '../../icons/logo_1.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import {
  DropdownItem,
  DropdownMenu,
  HamburgerButton,
  HeaderWrapper,
  HomeButton,
  LeftMenu,
  LogoImg,
  MenuItem,
  RightMenu, UserCircle
} from "./styles/HeaderStyles";



const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const firstName = useSelector((state: RootState) => state.auth.firstName);
  const isLoggedIn = !!token;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      setIsDropdownOpen(false);
    }
  }, [token, navigate]);

  const handleHamburgerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderWrapper>
      <LeftMenu>
        <HomeButton to={isLoggedIn ? "/home" : ""}>
          <LogoImg src={logo} alt="Logo" />
        </HomeButton>
        {isLoggedIn && (
          <MenuItem to="/resources" className={location.pathname === "/resources" ? "active" : ""}>
            Resources
          </MenuItem>
        )}
      </LeftMenu>
      <RightMenu>
        {isLoggedIn && (
          <>
            <HamburgerButton onClick={handleHamburgerClick}>
              <UserCircle>{firstName?.charAt(0).toUpperCase()}</UserCircle>
            </HamburgerButton>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
              <DropdownItem onClick={() => navigate('/profile-settings')}>Profile Settings</DropdownItem>
            </DropdownMenu>
          </>
        )}
      </RightMenu>
    </HeaderWrapper>
  );
};

export default Header;
