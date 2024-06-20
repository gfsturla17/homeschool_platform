import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoginRequestGraphQl, useLoginMutation, useSignupParentMutation } from "../../generated/graphql";
import { CreateParentInput } from '../../generated/graphql';
import { ErrorMessage, Form, Input, SubmitButton } from "./styles/ParentSignupFormFieldsStyles";

function ParentSignupFormFields() {
  const [formData, setFormData] = useState<CreateParentInput>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [signupParentMutation, { data: signUpResponse, loading: signUpLoading, error: signUpError }] = useSignupParentMutation();
  const [loginMutation, { data: loginResponse, loading: loginLoading, error: loginError }] = useLoginMutation();


  const navigate = useNavigate();


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.password !== confirmPassword) {
      return;
    }
    try {
      const signUpResult = await signupParentMutation({ variables: { data: formData } });
      if (signUpResponse) {
        const loginData: LoginRequestGraphQl = {
          email: formData.email,
          password: formData.password,
        };
        const loginResult = await loginMutation({ variables: { data: loginData } });
        if (loginResponse) {
          navigate('/complete-profile');
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Parent Sign Up</h2>
      <Input type="email" value={formData.email} onChange={(event: any) => setFormData({ ...formData, email: event.target.value })} placeholder="Email Address" />
      <Input type="text" value={formData.firstName} onChange={(event: any) => setFormData({ ...formData, firstName: event.target.value })} placeholder="First Name" />
      <Input type="text" value={formData.lastName} onChange={(event: any) => setFormData({ ...formData, lastName: event.target.value })} placeholder="Last Name" />
      <Input type="password" value={formData.password} onChange={(event: any) => setFormData({ ...formData, password: event.target.value })} placeholder="Password" />
      <Input type="password" value={confirmPassword} onChange={(event: any) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit">Sign up</SubmitButton>
    </Form>
  );
}

export default ParentSignupFormFields;