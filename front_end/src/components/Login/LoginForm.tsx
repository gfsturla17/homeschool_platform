import React, { useState } from 'react';
import {useNavigate } from "react-router-dom";
import LoginFormFields from './LoginFormFields';
import TeacherSignupFormFields from '../Signup/TeacherSignupFormFields';
import ParentSignupFormFields from '../Signup/ParentSignupFormFields';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../../store/store';
import { registerTeacher } from "../../store/teacherSlice";
import { FormContainer, LoginWrapper, SignupModal, Link } from "./styles/LoginFormStyles";


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
