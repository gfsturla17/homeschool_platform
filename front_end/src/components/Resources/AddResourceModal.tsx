import React, { useState, useEffect } from 'react';
import { ModalBackground, ModalContainer, CloseIcon, Button } from '../shared-styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import {
  ButtonContainer,
  FileInput,
  FileInputLabel,
  Input,
  LinkInput,
  Select,
  TextArea
} from "./styles/AddResourceModalStyles";

interface AddResourceModalProps {
  onClose: () => void;
  onAddResource?: (title: string, description: string, type: any, file?: File, link?: string) => void;
  onEditResource?: (title: string, description: string, file?: File, link?: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialType?: string;
  buttonText?: string;
  isEditMode?: boolean;
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({
                                                             onClose,
                                                             onAddResource,
                                                             onEditResource,
                                                             initialTitle = '',
                                                             initialDescription = '',
                                                             initialType = '',
                                                             buttonText = 'Add Resource',
                                                             isEditMode = false,
                                                           }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [type, setType] = useState(initialType);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState({ title: false, description: false, type: false, file: false, link: false });

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setType(initialType);
  }, [initialTitle, initialDescription, initialType]);

  const handleAdd = () => {
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

  const handleEdit = () => {
    if (!title || !description) {
      setErrors({ ...errors, title: !title, description: !description });
    } else if (onEditResource) {
      onEditResource(title, description, file, link);
      onClose(); // Close the modal after editing the resource
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0])
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
        <h2>{isEditMode ? "Edit Resource" : "Add New Resource"}</h2>
        <Input hasError={errors.title} placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); setErrors({ ...errors, title: false }); }} />
        <TextArea hasError={errors.description} placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value); setErrors({ ...errors, description: false }); }} />
        {!isEditMode && (
          <>
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
          </>
        )}
        <ButtonContainer>
          <Button variant="save" onClick={isEditMode ? handleEdit : handleAdd}>{buttonText}</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddResourceModal;
