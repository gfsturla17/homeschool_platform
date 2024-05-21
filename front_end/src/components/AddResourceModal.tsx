import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalBackground, ModalContainer, CloseIcon, Button } from './shared-styles';

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



interface AddResourceModalProps {
  onClose: () => void;
  onAddResource: (title: string, description: string, type: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialType?: string;
  buttonText?: string;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
                                                             onClose,
                                                             onAddResource,
                                                             initialTitle = '',
                                                             initialDescription = '',
                                                             initialType = '',
                                                             buttonText = 'Add Resource',
                                                           }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState(initialType);

  const handleAddResource = () => {
    onAddResource(title, description, type);
    onClose();
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <h2>{buttonText === 'Add Resource' ? 'Add New Resource' : 'Edit Resource'}</h2>
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
        <Button variant="save" onClick={handleAddResource}>{buttonText}</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddResourceModal;
