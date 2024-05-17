// ParentSignupFormFields
import React, { useState } from 'react';
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

interface ParentSignupFormFieldsProps {
  onSubmit: (userRegistration: any) => void;
  error: string;
}

function ParentSignupFormFields(props: ParentSignupFormFieldsProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleBirthdateChange = (event: any) => {
    const inputValue = event.target.value;
    const formattedValue: any = formatBirthdate(inputValue);
    setBirthdate(formattedValue);
  };

  const formatBirthdate = (inputValue: string) => {
    // format birthdate logic here
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Add your submit logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Parent Sign Up</h2>
      <Input type="email" value={email} onChange={(event: any) => setEmail(event.target.value)} placeholder="Email Address" />
      <Input type="text" value={username} onChange={(event: any) => setUsername(event.target.value)} placeholder="Username" />
      <div>
        <Input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} placeholder="Password" />
      </div>
      <div>
        <Input type="password" value={confirmPassword} onChange={(event: any) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
      </div>
      <Input type="text" value={birthdate} onChange={handleBirthdateChange} placeholder="Birthdate (mm-dd-yyyy)" />
      {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
}

export default ParentSignupFormFields;