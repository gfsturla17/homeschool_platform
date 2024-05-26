import React, { useEffect, useState } from "react";
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
  FaTimes, FaBell
} from "react-icons/fa";
import { lightTheme } from "../styles/theme";
import AddResourceModal from "./AddResourceModal";
import ResourceCard from "./ResourceCard";
import UploadNotification from "./UploadNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faUpload } from "@fortawesome/free-solid-svg-icons";
import { addResource, deleteResource, getResources } from "../store/resourceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Root } from "react-dom/client";
import { getTeacherProfile } from "../store/teacherSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const [selectedMenuItem, setSelectedMenuItem] = useState('All Resources');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadNotificationOpen, setIsUploadNotificationOpen] = useState(false);
  const [uploadingResourceName, setUploadingResourceName] = useState('');
  const teacherId = useSelector((state: RootState) => state.auth.id);
  const resources = useSelector((state: RootState) => state.resource.resources);
  const isLoading = useSelector((state: RootState) => state.resource.isLoading);

  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacher_id');

    if (storedTeacherId) {
      dispatch(getResources(teacherId));
      console.log(resources)
    }
  }, [dispatch, teacherId]);


  useEffect(() => {
    if (!isLoading) {
      setIsUploadNotificationOpen(false);
    }
  }, [isLoading]);

  const handleAddResource = (title, description, type, file, link) => {
    setUploadingResourceName(title);
    setIsUploadNotificationOpen(true);

    const resource = {
      title,
      description,
      resourceType: type,
      file: file ? file.name : link
    };

    dispatch(addResource({teacherId, resource }));
  };

  const handleDeleteResource = (id: number) => {
    dispatch(deleteResource(id));
  };

  const handleEditResource = (index: number, title: string, description: string, type: string) => {
    const newResources = [...resources];
    newResources[index] = { title, description, type };
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
          <span className="vertical-line">|</span>
          <span className="angle-arrow">
      {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
    </span>
        </CollapseButton>
        <div style={{ flex: 1 }} />
        {isLoading && !isUploadNotificationOpen && (
          <MenuItem onClick={() => setIsUploadNotificationOpen(true)}>
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              color="white"
              size="lg"
            />
          </MenuItem>
        )}
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
            id={resource.id} // Pass the id of the resource
            title={highlightText(resource.title)}
            description={highlightText(resource.description)}
            type={resource.type}
            onDelete={() => handleDeleteResource(resource.id)}
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
      <UploadNotification
        resourceName={uploadingResourceName}
        isOpen={isUploadNotificationOpen}
        onClose={() => setIsUploadNotificationOpen(false)}
      />
    </ResourcesContainer>
  );
};

export default Resources;
