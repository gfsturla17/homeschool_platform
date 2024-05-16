// src/components/LoginForm.tsx
import React, { useState } from 'react';
import './StyleSheet.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import LoginFormFields from './LoginFormFields';
import TeacherSignupFormFields from './TeacherSignupFormFields';
import ParentSignupFormFields from './ParentSignupFormFields';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { RootState, AppDispatch } from '../store/store';
import { registerTeacher } from "../store/teacherSlice";

interface LoginFormProps {
    isTeacher: boolean;
    onTeacherClick: () => void;
    onParentClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const teacher = useSelector((state: RootState) => state.teacher);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

    };

    const handleSignupSubmit = async (userRegistration: any) => {
        try {
            await dispatch(registerTeacher(userRegistration)).unwrap();
            navigate('/complete-profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <div>
          <div className="form-container login-form">
              <LoginFormFields onSubmit={handleLoginSubmit} onSignupClick={openModal} isTeacher={props.isTeacher} />
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="signup-modal" overlayClassName="signup-modal-overlay" style={{
                  overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)', // change the background color to be less transparent
                  },
                  content: {
                      top: '50%', // move the modal down to the middle of the screen
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                  },
              }}>
                  {props.isTeacher ? (
                    <TeacherSignupFormFields />
                  ) : (
                    <ParentSignupFormFields onSubmit={handleSignupSubmit} error={''} />
                  )}
              </Modal>
          </div>
          {!props.isTeacher && <p>Are you a teacher? <span className="teacher-link" onClick={props.onTeacherClick}>Click Here</span></p>}
          {props.isTeacher && <p>Are you a parent? <span className="parent-link" onClick={props.onParentClick}>Click Here</span></p>}
      </div>
    );
};

export default LoginForm;
