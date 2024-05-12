import React, { useState } from 'react';

interface LoginFormFieldsProps {
    onSubmit: (event: any) => void;
    onSignupClick: () => void;
    isTeacher: boolean;
}

function LoginFormFields(props: LoginFormFieldsProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!username || !password) {
            // setError('Please fill in all fields.'); // You need to pass setError as a prop or create a local state for error
            return;
        }
        props.onSubmit(event);
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