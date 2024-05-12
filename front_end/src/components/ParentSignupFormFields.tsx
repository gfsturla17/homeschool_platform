// ParentSignupFormFields.js
import React, { useState } from 'react';
import PasswordValidator from '../helpers/PasswordValidator';

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
        <form onSubmit={handleSubmit} className="form">
            <h2>Parent Sign Up</h2>
            <input type="email" value={email} onChange={(event: any) => setEmail(event.target.value)} placeholder="Email Address" className="form-input" />
            <input type="text" value={username} onChange={(event: any) => setUsername(event.target.value)} placeholder="Username" className="form-input" />
            <div className="password-input-container">
                <input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} placeholder="Password" className="form-input" />
            </div>
            <div className="password-input-container">
                <input type="password" value={confirmPassword} onChange={(event: any) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" className="form-input" />
            </div>
            <input type="text" value={birthdate} onChange={handleBirthdateChange} placeholder="Birthdate (mm-dd-yyyy)" className="form-input" />
            {props.error && <p className="error-message">{props.error}</p>}
            <button type="submit" className="submit-button">Sign up</button>
        </form>
    );
}

export default ParentSignupFormFields;