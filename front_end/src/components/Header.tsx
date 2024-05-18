import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from '../icons/logo_1.png';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import styled from 'styled-components';
import { lightTheme } from "../styles/theme";
import { logout } from "../store/authSlice";

const primaryColor = lightTheme.colors.primary;
const hoverColor = "#87CEEB"; // Defined hover color

const HeaderWrapper = styled.div<{ isLoggedIn: boolean }>`
    background-color: ${primaryColor};
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
`;

const LeftMenu = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItem = styled(NavLink)<{ isActive?: boolean }>`
    margin-right: 2rem;
    text-decoration: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 50px;
    width: 100px; /* Fix width */
    text-align: center; /* Center text */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease, font-weight 0.2s ease, border 0.2s ease;
    border: 2px solid transparent; /* Initial border */

    &:hover:not([to="/home"]) {
        background-color: ${hoverColor};
        font-weight: bold; /* Bold on hover */
    }

    ${({ isActive }) =>
            isActive &&
            `
    border: 2px solid ${hoverColor}; /* Active border color */
  `}
`;

const HomeButton = styled(NavLink)`
    margin-right: 2rem;
    text-decoration: none;

    &:hover {
        & img {
            border: 2px solid ${hoverColor};
        }
    }
`;

const LogoImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 55px; /* Adjust the height to maintain the original aspect ratio */
    width: auto;
    border-radius: 5px;

`;

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const HamburgerButton = styled.button<{ isActive?: boolean }>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 5px 10px; /* Added padding to match MenuItem */
    margin-left: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: normal;  // Ensure normal font-weight initially
    width: 100px; /* Fixed width */
    text-align: center; /* Center text */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px; /* Added border-radius */
    transition: background-color 0.2s ease, font-weight 0.2s ease, border 0.2s ease;
    border: 2px solid transparent; /* Initial border */

    &:hover {
        background-color: ${hoverColor};
        font-weight: bold;  // Bold on hover
    }

    ${({ isActive }) =>
            isActive &&
            `
    border: 2px solid ${hoverColor}; /* Active border color */
  `}
`;

const DropdownMenu = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: calc(100% - 5px);
    right: 0;
    background-color: #fff; /* White background */
    padding: 10px;
    list-style: none;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    border-radius: 10px; /* Add some border radius */
    box-shadow: 0 0 10px rgba(0,0,0,0.2); /* Add some box shadow */
`;

const DropdownItem = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    color: ${primaryColor}; /* Use primary color for text */

    &:hover {
        color: #666;
    }
`;

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoggedIn = !!token; // or token !== null && token !== ''
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleHamburgerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderWrapper isLoggedIn={isLoggedIn}>
      <LeftMenu>
        <HomeButton to="/home">
          <LogoImg src={logo} alt="Logo" />
        </HomeButton>
        <MenuItem to="/resources" isActive={location.pathname === "/resources"}>Resources</MenuItem>
      </LeftMenu>
      {isLoggedIn && (
        <RightMenu>
          <HamburgerButton isActive={location.pathname === "/settings"} onClick={handleHamburgerClick}>Settings</HamburgerButton>
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
          </DropdownMenu>
        </RightMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;