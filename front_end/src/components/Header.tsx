import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../icons/logo_1.png';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styled from 'styled-components';
import { lightTheme } from "../styles/theme";

const primaryColor = lightTheme.colors.primary;
const hoverColor = "#87CEEB"; // Defined hover color

const HeaderWrapper = styled.div<{ isLoggedIn: boolean }>`
    background-color: ${primaryColor};
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
`;

const Logo = styled.div`
    width: auto;
    margin-right: 20px;
`;

const LogoImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 125px;
    width: auto;
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
`;

const MenuItem = styled(NavLink)<{ isActive?: boolean }>`
    margin-right: 2rem;
    text-decoration: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 50px;
    width: 100px; /* Fixed width */
    text-align: center; /* Center text */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease, font-weight 0.2s ease, border 0.2s ease;
    border: 2px solid transparent; /* Initial border */

    &:hover {
        background-color: ${hoverColor};
        font-weight: bold; /* Bold on hover */
    }

    ${({ isActive }) =>
            isActive &&
            `
    border: 2px solid ${hoverColor}; /* Active border color */
  `}
`;

const RightMenu = styled.div`
    display: flex;
    align-items: center;
`;

const HamburgerButton = styled.button<{ isActive?: boolean }>`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 10px 20px; /* Added padding to match MenuItem */
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
    top: 50px;
    right: 0;
    background-color: ${primaryColor};
    padding: 10px;
    list-style: none;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    color: ${lightTheme.colors.secondary};

    &:hover {
        color: #666;
    }
`;

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.token);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleHamburgerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderWrapper isLoggedIn={isLoggedIn}>
      <Logo>
        <LogoImg src={logo} alt="Logo" />
      </Logo>
      {isLoggedIn && (
        <Menu>
          <MenuItem to="/home" isActive={location.pathname === "/home"}>Home</MenuItem>
          <MenuItem to="/resources" isActive={location.pathname === "/resources"}>Resources</MenuItem>
          <RightMenu>
            <HamburgerButton isActive={isDropdownOpen} onClick={handleHamburgerClick}>Settings</HamburgerButton>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem>Log out</DropdownItem>
            </DropdownMenu>
          </RightMenu>
        </Menu>
      )}
    </HeaderWrapper>
  );
};

export default Header;
