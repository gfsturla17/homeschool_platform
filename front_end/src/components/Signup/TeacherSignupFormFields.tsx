// TeacherSignupFormFields
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { registerTeacher } from '../../store/teacherSlice';
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setAuthAfterSignUp } from "../../store/authSlice";
import { ErrorMessage, Form, Input, SubmitButton } from "./styles/TeacherSignupFormFieldsStyles";



const TeacherSignupFormFields: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacher = useSelector((state: RootState) => state.teacher);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userRegistration: RegisterTeacherDTO = {
      email,
      password,
      firstName,
      lastName
    };

    dispatch(registerTeacher(userRegistration)).unwrap().then((data) => {
      const loginData = {
        email: userRegistration.email,
        password: userRegistration.password,
      };
      dispatch(setAuthAfterSignUp(loginData)).unwrap().then(() => {
        navigate('/complete-profile');
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Teacher Sign Up</h2>
      <Input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First Name" />
      <Input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" />
      <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" />
      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
      {teacher.error && <ErrorMessage>{JSON.stringify(teacher.error)}</ErrorMessage>}
      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
};

export default TeacherSignupFormFields;
