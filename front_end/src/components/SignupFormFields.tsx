import React, { useState } from 'react';
import PasswordValidator from '../helpers/PasswordValidator';

interface SignupFormFieldsProps {
    onSubmit: (userRegistration: any) => void;
    error: string;
}

function SignupFormFields(props: SignupFormFieldsProps) {
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
        if (!username || !password || !confirmPassword || !birthdate || !email) {
            // setError('Please fill in all fields.'); // You need to pass setError as a prop or create a local state for error
            return;
        }
        const validator = new PasswordValidator(password, confirmPassword);
        const errors = validator.validate();
        if (errors.length > 0) {
            // setError(errors.join('\n')); // You need to pass setError as a prop or create a local state for error
        } else {
            const userRegistration = {
                username,
                password,
                confirmPassword,
                birthdate,
                email,
            };
            props.onSubmit(userRegistration);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Sign Up</h2>
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

export default SignupFormFields;