import React, { useState } from 'react';
import styled from 'styled-components';
import { FaVideo, FaBook, FaFile, FaClipboard, FaLink, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { lightTheme } from "../styles/theme";


interface MenuItemIconProps {
  isCollapsed: boolean;
}

const ResourcesContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const SideMenu = styled.div<{ isCollapsed: boolean }>`
    position: relative;
    width: ${props => props.isCollapsed ? '40px' : '150px'};
    background-color: ${lightTheme.colors.primary};
    padding: 20px;
    color: #fff;
    transition: width 0.5s;
`;

const CollapseButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    background-color: ${lightTheme.colors.primary};
    color: #fff;
    padding: 5px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;


const MenuItem = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const MenuItemIcon = styled.span<MenuItemIconProps>`
    margin-right: ${props => props.isCollapsed ? '0' : '10px'};
    font-size: 18px;
`;

const MainContent = styled.div`
    flex-grow: 1;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${lightTheme.colors.primary};
    color: #fff;
    padding: 10px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;


interface MenuItemType {
  text: string;
  icon: JSX.Element;
}

const Resources = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Video');
  const [isCollapsed, setIsCollapsed] = useState(true);


  const menuItems: MenuItemType[] = [
    { text: 'Video', icon: <FaVideo /> },
    { text: 'eBooks', icon: <FaBook /> },
    { text: 'Documents', icon: <FaFile /> },
    { text: 'Worksheets', icon: <FaClipboard /> },
    { text: 'Links', icon: <FaLink /> },
  ];

  return (
    <ResourcesContainer>
      <SideMenu isCollapsed={isCollapsed}>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.text} onClick={() => setSelectedMenuItem(menuItem.text)}>
            <MenuItemIcon isCollapsed={isCollapsed}>{menuItem.icon}</MenuItemIcon>
            {!isCollapsed && menuItem.text}
          </MenuItem>
        ))}
        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)} onMouseOver={(e) => e.currentTarget.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', marginRight: '2px' }}>|</span>
            <span style={{ opacity: 0, transition: 'opacity 0.3s' }}>
              {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
            </span>
          </div>
        </CollapseButton>
      </SideMenu>
      <MainContent>
        <Header>
          <h2>{selectedMenuItem}</h2>
          <Button>Add New Resource</Button>
        </Header>
        {/* Here you can render the content based on the selected menu item */}
      </MainContent>
    </ResourcesContainer>
  );
};

export default Resources;