import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginFormFields from './LoginFormFields';
import TeacherSignupFormFields from '../Signup/TeacherSignupFormFields';
import ParentSignupFormFields from '../Signup/ParentSignupFormFields';
import { FormContainer, LoginWrapper, SignupModal, Link } from "./styles/LoginFormStyles";

interface LoginFormProps {
    isTeacher: boolean;
    onTeacherClick: () => void;
    onParentClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
      <div>
          <FormContainer>
              <LoginWrapper>
                  <LoginFormFields onSubmit={() => {}} onSignupClick={openModal} isTeacher={props.isTeacher} />
              </LoginWrapper>
              <SignupModal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  {props.isTeacher ? (
                    <TeacherSignupFormFields />
                  ) : (
                    <ParentSignupFormFields />
                  )}
              </SignupModal>
          </FormContainer>
          {!props.isTeacher && <p>Are you a teacher? <Link onClick={props.onTeacherClick}>Click Here</Link></p>}
          {props.isTeacher && <p>Are you a parent? <Link onClick={props.onParentClick}>Click Here</Link></p>}
      </div>
    );
};

export default LoginForm;
