import React, { useState } from 'react';
import axios from "axios";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

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
    const credentials = { email: username, password };
    dispatch(login(credentials)).unwrap().then(() => {
      navigate('/resources'); // or any other route you want to navigate to
    });
  };

    return (
        <form onSubmit={handleSubmit} className="form">
            <input type="text" value={username} onChange={(event: any) => setUsername(event.target.value)} placeholder={props.isTeacher ? "Teacher's Username" : "Username"} className="form-input" />
            <div className="password-input-container">
                <input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} placeholder={props.isTeacher ? "Teacher's Password" : "Password"} className="form-input" />
            </div>
            <button type="submit" className="submit-button">{props.isTeacher ? "Log in as Teacher" : "Log in"}</button>
            <p className="forgot-password-text">Forgot password</p>
            <button type="button" className="toggle-signup-button" onClick={props.onSignupClick}>Sign up</button>
        </form>
    );
}

export default LoginFormFields;