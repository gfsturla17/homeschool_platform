// LoginFormFields
import React, { useState } from 'react';
import axios from "axios";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import styled from 'styled-components';
import { ForgotPasswordText, Form, Input, SubmitButton, ToggleSignupButton } from "./styles/LoginFormFieldsStyles";

interface LoginFormFieldsProps {
  onSubmit: (event: any) => void;
  onSignupClick: () => void;
  isTeacher: boolean;
}

function LoginFormFields(props: LoginFormFieldsProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event) => {
    event.preventDefault();
    const role = props.isTeacher ? 'teacher' : 'student'; // or whatever the default role is
    const credentials = { email: username, password, role };
    dispatch(login(credentials)).unwrap().then(() => {
      navigate('/resources'); // or any other route you want to navigate to
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" value={username} onChange={(event: any) => setUsername(event.target.value)} placeholder={props.isTeacher ? "Teacher's Username" : "Username"} />
      <div>
        <Input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} placeholder={props.isTeacher ? "Teacher's Password" : "Password"} />
      </div>
      <SubmitButton type="submit">{props.isTeacher ? "Log in as Teacher" : "Log in"}</SubmitButton>
      <ForgotPasswordText>Forgot password</ForgotPasswordText>
      <ToggleSignupButton type="button" onClick={props.onSignupClick}>Sign up</ToggleSignupButton>
    </Form>
  );
}

export default LoginFormFields;