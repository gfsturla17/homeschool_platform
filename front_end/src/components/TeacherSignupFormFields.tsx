import React, { useState } from 'react';
import PasswordValidator from '../helpers/PasswordValidator';


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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Add your submit logic here
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
            {props.error && <p className="error-message">{props.error}</p>}
            <button type="submit" className="submit-button">Sign up</button>
        </form>
    );
}

export default TeacherSignupFormFields;