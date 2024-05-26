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

interface ResourceCardProps {
  id: any;
  title: ReactNode;
  description: ReactNode;
  type: string;
  onDelete: () => void;
  onEdit: (title: string, description: string, file?: File, link?: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ id, title, description, type, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getIcon = () => {
    switch (type) {
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

  const handleEdit = (title: string, description: string, file?: File, link?: string) => {
    onEdit(title, description, file, link);
    setIsEditModalOpen(false);
  };

  return (
    <ResourceCardContainer>
      <IconContainer>{getIcon()}</IconContainer>
      <InfoContainer>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Type: {type}</p>
      </InfoContainer>
      <ButtonContainer>
        <ViewButton>View</ViewButton>
        <EditButton onClick={() => setIsEditModalOpen(true)}>Edit</EditButton>
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
      {isEditModalOpen && (
        <AddResourceModal
          onClose={() => setIsEditModalOpen(false)}
          onEditResource={handleEdit}
          initialTitle={title.toString()}
          initialDescription={description.toString()}
          initialType={type}
          buttonText="Save Changes"
          isEditMode={true}
        />
      )}
    </ResourceCardContainer>
  );
};

export default ResourceCard;
