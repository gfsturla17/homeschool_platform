import React, { useState } from 'react';
import PasswordValidator from '../helpers/PasswordValidator';
import {TeacherAPIService} from "../services/TeacherAPIService";

const teacherAPIService = new TeacherAPIService();

interface TeacherSignupFormFieldsProps {
    onSubmit: (userRegistration: any) => void;
    error: string;
}

function TeacherSignupFormFields(props: TeacherSignupFormFieldsProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userRegistration = {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            password,
            confirmPassword
        };

        teacherAPIService.registerTeacher(userRegistration);

    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Teacher Sign Up</h2>
            <input type="text" value={firstName} onChange={(event: any) => setFirstName(event.target.value)} placeholder="First Name" className="form-input" />
            <input type="text" value={lastName} onChange={(event: any) => setLastName(event.target.value)} placeholder="Last Name" className="form-input" />
            <input type="email" value={email} onChange={(event: any) => setEmail(event.target.value)} placeholder="Email Address" className="form-input" />
            <input type="text" value={phoneNumber} onChange={(event: any) => setPhoneNumber(event.target.value)} placeholder="Phone Number" className="form-input" />
            <input type="text" value={address} onChange={(event: any) => setAddress(event.target.value)} placeholder="Address" className="form-input" />
            <input type="text" value={city} onChange={(event: any) => setCity(event.target.value)} placeholder="City" className="form-input" />
            <input type="text" value={state} onChange={(event: any) => setState(event.target.value)} placeholder="State" className="form-input" />
            <input type="text" value={zipCode} onChange={(event: any) => setZipCode(event.target.value)} placeholder="Zip Code" className="form-input" />
            <input type="password" value={password} onChange={(event: any) => setPassword(event.target.value)} placeholder="Password" className="form-input" />
            <input type="password" value={confirmPassword} onChange={(event: any) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" className="form-input" />
            {props.error && <p className="error-message">{props.error}</p>}
            <button type="submit" className="submit-button">Sign up</button>
        </form>
    );
}

export default TeacherSignupFormFields;