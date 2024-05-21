import React from 'react';
import styled from 'styled-components';
import { FaVideo, FaBook, FaFile, FaClipboard, FaLink } from "react-icons/fa";

const ResourceCardContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    margin-right: 20px;
    font-size: 40px;
`;

const InfoContainer = styled.div`
    flex-grow: 1;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ViewButton = styled.button`
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;

const EditButton = styled.button`
    background-color: #e67e22;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d35400;
    }
`;

const DeleteButton = styled.button`
    background-color: #e74c3c;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }
`;

interface ResourceCardProps {
  title: string;
  description: string;
  type: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, type }) => {
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
        <EditButton>Edit</EditButton>
        <DeleteButton>Delete</DeleteButton>
      </ButtonContainer>
    </ResourceCardContainer>
  );
};

export default ResourceCard;
