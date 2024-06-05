import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const primaryColor = "#375A7F";
export const secondaryColor = "#2C3E50";
export const accentColor = "#E74C3C";
export const lightGray = "#ECF0F1";
export const mediumGray = "#95A5A6";
export const darkGray = "#34495E";

export const HeaderWrapper = styled.div`
    background-color: ${primaryColor};
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

export const LeftMenu = styled.div`
    display: flex;
    align-items: center;
`;

export const HomeButton = styled(NavLink)`
    margin-right: 2rem;
    text-decoration: none;
    display: flex;
    align-items: center;

    &:hover img {
        border: 2px solid ${secondaryColor};
    }
`;

export const LogoImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 60px;
    width: auto;
    box-sizing: border-box;
`;

export const MenuItem = styled(NavLink)`
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

export const RightMenu = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const UserCircle = styled.div`
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

export const HamburgerButton = styled.button`
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

export const DropdownMenu = styled.ul<{ isOpen: boolean }>`
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

export const DropdownItem = styled.li`
    padding: 10px 20px;
    cursor: pointer;
    color: ${primaryColor};

    &:hover {
        background-color: #f1f1f1;
    }
`;