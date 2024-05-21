import React, { useState } from 'react';
import styled, { css } from "styled-components";
import {
  FaVideo,
  FaBook,
  FaFile,
  FaClipboard,
  FaLink,
  FaAngleRight,
  FaAngleLeft,
  FaThList,
  FaTimes
} from "react-icons/fa";
import { lightTheme } from "../styles/theme";
import AddResourceModal from "./AddResourceModal";
import ResourceCard from "./ResourceCard";

interface MenuItemIconProps {
  isCollapsed: boolean;
}

const ResourcesContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const SideMenu = styled.div<{ isCollapsed: boolean }>`
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

const CollapseButton = styled.button<CollapseButtonProps>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -20px;
    background-color: ${lightTheme.colors.primary};
    color: #fff;
    padding: 5px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s;

    ${(props) =>
            props.isCollapsed
                    ? css`
                        &:hover {
                            transform: rotate(180deg);
                        }
                    `
                    : css`
                        &:hover {
                            transform: rotate(0deg);
                        }
                    `}
`;

const MenuItem = styled.div`
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

const MenuItemIcon = styled.span<MenuItemIconProps>`
    margin-right: ${props => props.isCollapsed ? '0' : '10px'};
    font-size: 20px;
`;

const MainContent = styled.div`
    flex-grow: 1;
    padding: 20px;
    background-color: #f5f5f5;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${lightTheme.colors.primary};
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const SearchInputContainer = styled.div`
    position: relative;
    width: 50%;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    margin: 0 20px;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #ccc;
`;

const HighlightedText = styled.span`
    background-color: #ADD8E6;
`;

const Button = styled.button`
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

interface MenuItemType {
  text: string;
  icon: JSX.Element;
}

const menuItems: MenuItemType[] = [
  { text: 'All Resources', icon: <FaThList /> },
  { text: 'Video', icon: <FaVideo /> },
  { text: 'eBooks', icon: <FaBook /> },
  { text: 'Documents', icon: <FaFile /> },
  { text: 'Worksheets', icon: <FaClipboard /> },
  { text: 'Links', icon: <FaLink /> },
];

const Resources = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('All Resources');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddResource = (title: string, description: string, type: string) => {
    setResources([...resources, { title, description, type }]);
  };

  const handleDeleteResource = (index: number) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    setResources(newResources);
  };

  const handleEditResource = (index: number, title: string, description: string, type: string) => {
    const newResources = [...resources];
    newResources[index] = { title, description, type };
    setResources(newResources);
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const regex = new RegExp(searchQuery, 'gi');
    const match = text.match(regex);
    if (!match) return text;
    return (
      <React.Fragment>
        {text.split(regex).map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < match.length && (
              <HighlightedText>{match[index]}</HighlightedText>
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  return (
    <ResourcesContainer>
      <SideMenu isCollapsed={isCollapsed}>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem.text} onClick={() => setSelectedMenuItem(menuItem.text)}>
            <MenuItemIcon isCollapsed={isCollapsed}>{menuItem.icon}</MenuItemIcon>
            {!isCollapsed && menuItem.text}
          </MenuItem>
        ))}
        <CollapseButton onClick={() => setIsCollapsed(!isCollapsed)} isCollapsed={isCollapsed}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </CollapseButton>
      </SideMenu>
      <MainContent>
        <Header>
          <h2>{selectedMenuItem}</h2>
          <SearchInputContainer>
            <SearchInput
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <ClearButton onClick={() => setSearchQuery('')}>
                <FaTimes />
              </ClearButton>
            )}
          </SearchInputContainer>
          <Button onClick={() => setIsModalOpen(true)}>Add New Resource</Button>
        </Header>
        {resources.filter(resource =>
          (selectedMenuItem === 'All Resources' || resource.type === selectedMenuItem) &&
          (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ).map((resource, index) => (
          <ResourceCard
            key={index}
            title={highlightText(resource.title)}
            description={highlightText(resource.description)}
            type={resource.type}
            onDelete={() => handleDeleteResource(index)}
            onEdit={(title, description, type) => handleEditResource(index, title, description, type)}
          />
        ))}
      </MainContent>
      {isModalOpen && (
        <AddResourceModal
          onClose={() => setIsModalOpen(false)}
          onAddResource={handleAddResource}
        />
      )}
    </ResourcesContainer>
  );
};

export default Resources;
