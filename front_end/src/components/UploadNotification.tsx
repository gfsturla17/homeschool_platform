import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMinus } from '@fortawesome/free-solid-svg-icons';
import { lightTheme } from "../styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface UploadNotificationProps {
  resourceName: string;
  isOpen: boolean;
  onClose: () => void;
}

const UploadNotification: React.FC<UploadNotificationProps> = ({ resourceName, isOpen, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [show, setShow] = useState(false);
  const isLoading = useSelector((state: RootState) => state.resource.isLoading);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoading && isOpen) {
      setTimeout(() => {
        setShow(false);
        onClose();
      }, 5000);
    }
  }, [isLoading, isOpen, onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: lightTheme.colors.background,
        color: lightTheme.colors.text,
        padding: '10px',
        textAlign: 'center',
        transform: show ? 'translateY(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uploading {resourceName}...</p>
      {show && (
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: 'calc(50% - 20px)',
            width: '80px',
            height: isHovered ? '40px' : '20px',
            backgroundColor: 'rgba(79, 80, 83, 0.94)',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={() => {
            setShow(false);
            onClose();
          }}
        >
          {isHovered ? (
            <FontAwesomeIcon icon={faChevronDown} color="white" />
          ) : (
            <FontAwesomeIcon icon={faMinus} color="white" />
          )}
        </div>
      )}
    </div>
  );
};

export default UploadNotification;
