import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import LoginFormFields from './LoginFormFields';
import TeacherSignupFormFields from './TeacherSignupFormFields';
import ParentSignupFormFields from './ParentSignupFormFields';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { registerTeacher } from "../store/teacherSlice";
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginWrapper = styled.div`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
`;

const Link = styled.span`
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        font-weight: bold;
    }
`;

const SignupModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px; /* adjust the width to your liking */
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .teacher-link, .parent-link {
        cursor: pointer;
    }

    .teacher-link:hover, .parent-link:hover {
        text-decoration: underline;
        font-weight: bold;
    }

    .submit-button {
        background-color: #28a745;
        color: white;
        padding: 10px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        width: 100%;
    }

    .forgot-password-text {
        color: #87CEEB;
        margin-bottom: 10px;
    }

    .toggle-signup-button {
        background-color: #0070e0;
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }
`;

interface LoginFormProps {
    isTeacher: boolean;
    onTeacherClick: () => void;
    onParentClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Add login logic here
    };

    const handleSignupSubmit = async (userRegistration: any) => {
        try {
            await dispatch(registerTeacher(userRegistration)).unwrap();
            navigate('/complete-profile');
            closeModal();
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
      <div>
          <FormContainer>
              <LoginWrapper>
                  <LoginFormFields onSubmit={handleLoginSubmit} onSignupClick={openModal} isTeacher={props.isTeacher} />
              </LoginWrapper>
              <SignupModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  {props.isTeacher ? (
                    <TeacherSignupFormFields />
                  ) : (
                    <ParentSignupFormFields onSubmit={handleSignupSubmit} error={''} />
                  )}
              </SignupModal>
          </FormContainer>
          {!props.isTeacher && <p>Are you a teacher? <Link onClick={props.onTeacherClick}>Click Here</Link></p>}
          {props.isTeacher && <p>Are you a parent? <Link onClick={props.onParentClick}>Click Here</Link></p>}
      </div>
    );
};

export default LoginForm;
