import styled from "styled-components";
import { lightTheme } from "../../../styles/theme";

interface MenuItemIconProps {
  isCollapsed: boolean;
}

export const ResourcesContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const SideMenu = styled.div<{ isCollapsed: boolean }>`
    position: relative;
    width: ${props => props.isCollapsed ? '50px' : '200px'};
    background-color: ${lightTheme.colors.primary};
    padding: 20px;
    color: #fff;
    transition: width 0.5s;
`;

interface CollapseButtonProps {
  isCollapsed: boolean;
}

export const CollapseButton = styled.button<CollapseButtonProps>`
    position: absolute;
    top: 40%; /* Center the button vertically */
    transform: translateY(-50%); /* Center the button vertically */
    right: ${props => props.isCollapsed ? '-15px' : '-25px'};
    background-color: rgba(79, 80, 83, 0.94); /* More transparent */
    color: #b4c0fd;
    padding: 10px; /* Adjust padding */
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 5px; /* Rectangle shape */
    width: 20px; /* Slimmer and longer */
    height: 80px; /* Adjust height */
    display: flex;
    justify-content: center;
    align-items: center;

    .vertical-line {
        display: block;
        width: 4px;
        height: 20px;
        background-color: #fff;
    }

    .angle-arrow {
        display: none;
        font-size: 20px; /* Slightly smaller icon */
        color: #fff;
    }

    &:hover {
        background-color: rgb(0, 26, 43); /* Less transparent on hover */
        width: 25px; /* Slimmer and longer */

    }

    &:hover .vertical-line {
        display: none;
    }

    &:hover .angle-arrow {
        display: block;
    }
`;

export const MenuItem = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const MenuItemIcon = styled.span<MenuItemIconProps>`
    margin-right: ${props => props.isCollapsed ? '0' : '10px'};
    font-size: 20px;
`;

export const MainContent = styled.div`
    flex-grow: 1;
    padding: 20px;
    background-color: #f5f5f5;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${lightTheme.colors.primary};
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const SearchInputContainer = styled.div`
    position: relative;
    width: 50%;
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    margin: 0 20px;
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #ccc;
`;

export const HighlightedText = styled.span`
    background-color: #ADD8E6;
`;

export const Button = styled.button`
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45A049;
    }
`;