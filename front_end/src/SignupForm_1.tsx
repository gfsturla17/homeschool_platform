import React, { useState } from 'react';
import './components/StyleSheet.scss';
import PasswordValidator from './helpers/PasswordValidator';
import UserService from "./services/UserService";
import { useNavigate } from 'react-router-dom';

const userService = new UserService();


function SignupForm_1() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!username || !password || !confirmPassword || !birthdate || !email) {
            setError('Please fill in all fields.');
            return;
        }
        const validator = new PasswordValidator(password, confirmPassword);
        const errors = validator.validate();
        if (errors.length > 0) {
            setError(errors.join('\n'));
        } else {
            setError('');
            const userRegistration = {
                username,
                password,
                confirmPassword,
                birthdate,
                email,
            };
            userService.registerUser(userRegistration).then(() => {
                navigate('/complete-profile');
            }).catch((error) => {
                setError(error.message);
            });
        }
    };

    const handleBirthdateChange = (event: any) => {
        const inputValue = event.target.value;
        const formattedValue = formatBirthdate(inputValue);
        setBirthdate(formattedValue);
    };

    const formatBirthdate = (inputValue: string) => {
        const digits = inputValue.replace(/\D/g, '');
        const formattedValue = digits.slice(0, 2) + (digits.length > 2 ? '-' : '') +
            digits.slice(2, 4) + (digits.length > 4 ? '-' : '') +
            digits.slice(4, 8);
        return formattedValue;
    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="email"
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                    placeholder="Email Address"
                    className="form-input"
                />
                <input
                    type="text"
                    value={username}
                    onChange={(event: any) => setUsername(event.target.value)}
                    placeholder="Username"
                    className="form-input"
                />
                <div className="password-input-container">
                    <input
                        type="password"
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                        placeholder="Password"
                        className="form-input"
                    />
                    {error && <span className="error-asterisk">*</span>}
                </div>
                <div className="password-input-container">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event: any) => setConfirmPassword(event.target.value)}
                        placeholder="Confirm Password"
                        className="form-input"
                    />
                    {error && <span className="error-asterisk">*</span>}
                </div>
                <input
                    type="text"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    placeholder="Birthdate (mm-dd-yyyy)"
                    className="form-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Sign up</button>
            </form>
        </div>
    );
}

export default SignupForm_1;