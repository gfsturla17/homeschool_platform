// TeacherSignupFormFields
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { registerTeacher } from '../store/teacherSlice';
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const ErrorMessage = styled.p`
    color: red;
    white-space: pre-wrap;
`;

const SubmitButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 100%;
`;

const TeacherSignupFormFields: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacher = useSelector((state: RootState) => state.teacher);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userRegistration: RegisterTeacherDTO = {
      email,
      password
    };

    dispatch(registerTeacher(userRegistration)).unwrap().then(() => {
      navigate('/complete-profile'); // navigate to the CompleteProfileForm component
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Teacher Sign Up</h2>
      <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" />
      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
      {teacher.error && <ErrorMessage>{teacher.error}</ErrorMessage>}
      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
};

export default TeacherSignupFormFields;