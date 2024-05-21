import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;  /* Ensures modal doesn't exceed screen width */
    position: relative;
`;

const CloseIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    cursor: pointer;
`;

const Input = styled.input`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Select = styled.select`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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

interface AddResourceModalProps {
  onClose: () => void;
  onAddResource: (title: string, description: string, type: string) => void;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ onClose, onAddResource }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  const handleAddResource = () => {
    onAddResource(title, description, type);
    onClose();
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <h2>Add New Resource</h2>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Video">Video</option>
          <option value="eBooks">eBooks</option>
          <option value="Documents">Documents</option>
          <option value="Worksheets">Worksheets</option>
          <option value="Links">Links</option>
        </Select>
        <Button onClick={handleAddResource}>Add Resource</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddResourceModal;
