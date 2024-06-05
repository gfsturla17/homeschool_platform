import React, { useState } from 'react';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { getCroppedImg } from "../../utils/cropImage";
import { RootState } from "../../store/store";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: #0070e0;
`;

const ProfilePicture = styled.img`
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    cursor: pointer;
`;

const ProfilePictureContainer = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    color: #fff;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: #aaa;
    }
`;

const CameraIconContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0; // Remove any padding
    margin: 0; // Remove any margin
`;

const CropperContainer = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    background-color: transparent;
    padding: 0; // Remove any padding
    margin: 0; // Remove any margin
`;

const ModalFooter = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: relative; // Add this line
    z-index: 1; // Add this line
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ProfilePictureSection: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [initialCrop, setInitialCrop] = useState({ x: 0, y: 0 });
  const [initialZoom, setInitialZoom] = useState(1);

  const firstName = useSelector((state: RootState) => state.auth.firstName);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setPreview(reader.result as string);
        setIsOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedImage(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (originalImage && croppedImage) {
      const croppedImg = await getCroppedImg(originalImage, croppedImage);
      setPreview(croppedImg);
      setInitialCrop(crop);
      setInitialZoom(zoom);
    }
    setIsOpen(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleImageClick = () => {
    setIsOpen(true);
    setCrop(initialCrop);
    setZoom(initialZoom);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      {preview ? (
        <ProfilePicture src={preview} alt="Profile Picture Preview" onClick={handleImageClick} />
      ) : (
        <ProfilePictureContainer onClick={() => document.getElementById('fileInput')?.click()}>
          {firstName?.charAt(0).toUpperCase()}
          <CameraIconContainer>
            <FontAwesomeIcon icon={faCamera} size="lg" color="#fff" />
          </CameraIconContainer>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
        </ProfilePictureContainer>
      )}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            width: 500,
            height: 500,
            border: "blue",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <ModalContent>
          <CropperContainer>
            <Cropper
              image={originalImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
              cropShape="round"
              objectFit="cover" // Set objectFit to cover
            />
          </CropperContainer>
          <ModalFooter>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ProfilePictureSection;