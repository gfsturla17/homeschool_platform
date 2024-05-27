import React, { ReactNode, useState } from "react";
import { FaVideo, FaBook, FaFile, FaClipboard, FaLink } from "react-icons/fa";
import { ModalBackground, ModalContainer, CloseIcon, Button } from "../shared-styles";
import AddResourceModal from "./AddResourceModal";
import {
  ButtonContainer, DeleteButton, EditButton,
  IconContainer,
  InfoContainer,
  ResourceCardContainer,
  ViewButton
} from "./styles/ResourceCardStyles";
import { ResourceTypeDTO } from "shared-nextdoor-education/dist/resource/resource.dto";

interface ResourceCardProps {
  id: any;
  title: ReactNode;
  description: ReactNode;
  resourceType: ResourceTypeDTO;
  createdAt: Date;
  lastUpdated: Date;
  onDelete: () => void;
  onEdit: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ id, title, description, resourceType, createdAt, lastUpdated, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getIcon = () => {
    switch (resourceType.type) {
      case 'Video':
        return <FaVideo />;
      case 'eBooks':
        return <FaBook />;
      case 'Documents':
        return <FaFile />;
      case 'Worksheets':
        return <FaClipboard />;
      case 'Links':
        return <FaLink />;
      default:
        return null;
    }
  };

  const handleDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <ResourceCardContainer>
      <IconContainer>{getIcon()}</IconContainer>
      <InfoContainer>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Type: {resourceType.type}</p>
        <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(lastUpdated).toLocaleDateString()}</p>
      </InfoContainer>
      <ButtonContainer>
        <ViewButton>View</ViewButton>
        <EditButton onClick={() => onEdit()}>Edit</EditButton>
        <DeleteButton onClick={() => setIsDeleteModalOpen(true)}>Delete</DeleteButton>
      </ButtonContainer>
      {isDeleteModalOpen && (
        <ModalBackground onClick={() => setIsDeleteModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={() => setIsDeleteModalOpen(false)}>X</CloseIcon>
            <h2>Delete Resource</h2>
            <p>Are you sure you want to delete this resource?</p>
            <Button variant="delete" onClick={handleDelete}>DELETE</Button>
          </ModalContainer>
        </ModalBackground>
      )}
    </ResourceCardContainer>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default ResourceCard;
