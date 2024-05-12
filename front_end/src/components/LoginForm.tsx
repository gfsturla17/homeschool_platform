import React, { useState } from 'react';
import './StyleSheet.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import LoginFormFields from './LoginFormFields';
import SignupFormFields from './SignupFormFields';
import PasswordValidator from '../helpers/PasswordValidator';
import UserService from "../services/UserService";

const userService = new UserService();

interface LoginFormProps {
    isTeacher: boolean;
    onTeacherClick: () => void;
    onParentClick: () => void;
}

function LoginForm(props: LoginFormProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleLoginSubmit = (event: any) => {
        // Add your login logic here
    };

    const handleSignupSubmit = (userRegistration: any) => {
        userService.registerUser(userRegistration).then(() => {
            navigate('/complete-profile');
        }).catch((error: any) => {
            setError(error.message);
        });
    };

    return (
        <div>
            <div className="form-container login-form">
                <LoginFormFields onSubmit={handleLoginSubmit} onSignupClick={openModal} isTeacher={props.isTeacher} />
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="signup-modal">
                    <SignupFormFields onSubmit={handleSignupSubmit} error={error} />
                </Modal>
            </div>
            {!props.isTeacher && <p>Are you a teacher? <span className="teacher-link" onClick={props.onTeacherClick}>Click Here</span></p>}
            {props.isTeacher && <p>Are you a parent? <span className="parent-link" onClick={props.onParentClick}>Click Here</span></p>}
        </div>
    );
}

export default LoginForm;