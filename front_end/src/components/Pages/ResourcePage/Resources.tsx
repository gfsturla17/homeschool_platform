import React, { useEffect, useState } from "react";
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
import AddResourceModal from "../../Resources/AddResourceModal";
import ResourceCard from "../../Resources/ResourceCard";
import UploadNotification from "../../Resources/UploadNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { addResource, deleteResource, getResources, updateResource } from "../../../store/resourceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  ClearButton,
  CollapseButton, Header,
  HighlightedText, MainContent,
  MenuItem,
  MenuItemIcon,
  ResourcesContainer, SearchInput, SearchInputContainer,
  SideMenu
} from "../styles/ResourcePageStyles";
import { Button } from "../../shared-styles";
import { CreateResourceDTO } from "shared-nextdoor-education/dist/create-resource.dto";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResourceIndex, setSelectedResourceIndex] = useState<number | null>(null);

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
    const resourceType = type;

    const resource = {
      title,
      description,
      resourceType,
      file
    };
    dispatch(addResource({ teacherId, resource }));
  };

  const handleEditResource = (title, description, file, link) => {
    if (selectedResourceIndex !== null) {
      const resourceId = resources[selectedResourceIndex].id;
      const resourceType = resources[selectedResourceIndex].resourceType.type;
      const updatedResource = {
        title,
        description,
        file: file,
        resourceType
      };

      dispatch(updateResource({ resourceId, resource: updatedResource }));
    }
  };

  const handleDeleteResource = (id: number) => {
    dispatch(deleteResource(id));
  };

  const handleEditButtonClick = (index: number) => {
    setSelectedResourceIndex(index);
    setIsEditMode(true);
    setIsModalOpen(true);
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
          <Button onClick={() => { setIsEditMode(false); setSelectedResourceIndex(null); setIsModalOpen(true); }}>Add New Resource</Button>
        </Header>
        {resources.filter(resource =>
          (selectedMenuItem === 'All Resources' || resource.type === selectedMenuItem) &&
          (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ).map((resource, index) => (
          <ResourceCard
            key={index}
            id={resource.id}
            title={highlightText(resource.title)}
            description={highlightText(resource.description)}
            resourceType={resource.resourceType} // Use resourceType instead of type
            createdAt={resource.createdAt}
            lastUpdated={resource.lastUpdated}
            onDelete={() => handleDeleteResource(resource.id)}
            onEdit={() => handleEditButtonClick(index)} // Pass the handleEditButtonClick function
          />
        ))}
      </MainContent>
      {isModalOpen && (
        <AddResourceModal
          onClose={() => setIsModalOpen(false)}
          onAddResource={handleAddResource}
          onEditResource={handleEditResource}
          initialTitle={selectedResourceIndex !== null ? resources[selectedResourceIndex].title : ''}
          initialDescription={selectedResourceIndex !== null ? resources[selectedResourceIndex].description : ''}
          initialType={selectedResourceIndex !== null ? resources[selectedResourceIndex].resourceType : ''}
          buttonText={isEditMode ? "Save Changes" : "Add Resource"}
          isEditMode={isEditMode}
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
