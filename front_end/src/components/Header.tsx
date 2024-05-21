import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from '../icons/logo_1.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import styled from 'styled-components';
import { logout } from "../store/authSlice";

const primaryColor = "#375A7F";
const secondaryColor = "#2C3E50";
const accentColor = "#E74C3C";
const lightGray = "#ECF0F1";
const mediumGray = "#95A5A6";
const darkGray = "#34495E";

const HeaderWrapper = styled.div`
    background-color: ${primaryColor};
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const LeftMenu = styled.div`
    display: flex;
    align-items: center;
`;

const HomeButton = styled(NavLink)`
    margin-right: 2rem;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover img {
        border: 2px solid ${secondaryColor};
    }
`;

const LogoImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 60px;
    width: auto;
    box-sizing: border-box;
`;

const MenuItem = styled(NavLink)`
    margin-right: 2rem;
    text-decoration: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 25px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s, font-weight 0.3s, border 0.3s;
    border: 2px solid transparent;

    &:hover {
        background-color: ${secondaryColor};
        font-weight: bold;
    }

    &.active {
        border: 2px solid ${secondaryColor};
    }
`;

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const UserCircle = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${mediumGray};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
`;

const HamburgerButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    margin-left: 20px;
    color: #fff;
    font-size: 1rem;
    width: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    transition: background-color 0.3s, font-weight 0.3s, border 0.3s;
    border: 2px solid transparent;

    &:hover {
        background-color: ${secondaryColor};
        font-weight: bold;
    }

    &.active {
        border: 2px solid ${secondaryColor};
    }
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: #fff;
    padding: 10px;
    list-style: none;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.15);
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.li`
    padding: 10px 20px;
    cursor: pointer;
    color: ${primaryColor};

    &:hover {
        background-color: #f1f1f1;
    }
`;

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
