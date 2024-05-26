import React, { useState } from 'react';
import styled from 'styled-components';
import { ModalBackground, ModalContainer, CloseIcon, Button } from './shared-styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const Input = styled.input<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

const TextArea = styled.textarea<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
    resize: vertical; /* Restrict resize to only vertical */
    max-height: 150px; /* Set a maximum height for the textarea */
`;

const Select = styled.select<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

const FileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    display: block;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
`;

const LinkInput = styled.input<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

interface AddResourceModalProps {
  onClose: () => void;
  onAddResource: (title: string, description: string, type: string, file?: File, link?: string) => void;
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
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState({ title: false, description: false, type: false, file: false, link: false });

  const handleAddResource = () => {
    if (!title || !description || !type) {
      setErrors({ ...errors, title: !title, description: !description, type: !type });
    } else if ((type === 'Video' || type === 'eBooks' || type === 'Documents' || type === 'Worksheets') && !file) {
      setErrors({ ...errors, file: true });
    } else if (type === 'Links' && !link) {
      setErrors({ ...errors, link: true });
    } else {
      onAddResource(title, description, type, file, link);
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrors({ ...errors, file: false });
    } else {
      setFile(null);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    setErrors({ ...errors, link: false });
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <h2>{buttonText === 'Add Resource' ? 'Add New Resource' : 'Edit Resource'}</h2>
        <Input hasError={errors.title} placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, title: false }); }} />
        <TextArea hasError={errors.description} placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value); setErrors({ ...errors, description: false }); }} />
        <Select hasError={errors.type} value={type} onChange={(e) => { setType(e.target.value); setErrors({ ...errors, type: false }); }}>
          <option value="">Select Type</option>
          <option value="Video">Video</option>
          <option value="eBooks">eBooks</option>
          <option value="Documents">Documents</option>
          <option value="Worksheets">Worksheets</option>
          <option value="Links">Links</option>
        </Select>
        {(type === 'Video' || type === 'eBooks' || type === 'Documents' || type === 'Worksheets') && (
          <FileInputLabel>
            {file ? file.name : 'Select File'}
            <FontAwesomeIcon icon={faFileUpload} style={{ marginLeft: 10 }} />
            <FileInput type="file" onChange={handleFileChange} />
          </FileInputLabel>
        )}
        {type === 'Links' && (
          <LinkInput hasError={errors.link} placeholder="Link" value={link} onChange={handleLinkChange} />
        )}
        <ButtonContainer>
          <Button variant="save" onClick={handleAddResource}>{buttonText}</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddResourceModal;