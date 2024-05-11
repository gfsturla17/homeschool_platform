import React, { useState } from 'react';
import UserService from '../services/UserService';
import './StyleSheet.scss';


const userService = new UserService();

function CompleteProfileForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [numberOfKids, setNumberOfKids] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!firstName || !lastName || !numberOfKids || !address || !city || !state || !zipCode) {
            setError('Please fill in all fields.');
            return;
        }
        const profileCompletion = {
            firstName,
            lastName,
            numberOfKids,
            address,
            city,
            state,
            zipCode,
        };
        userService.completeProfile(profileCompletion).catch((error) => {
            setError(error.message);
        });
    };


    return (
        <div className="form-container">
            <h2>Complete Profile</h2>
            <form onSubmit={handleSubmit} className="form">
                <h3>Basic Info</h3>
                <div className="name-inputs">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(event: any) => setFirstName(event.target.value)}
                        placeholder="First Name"
                        className="form-input"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(event: any) => setLastName(event.target.value)}
                        placeholder="Last Name"
                        className="form-input"
                    />
                </div>
                <h3>Address</h3>
                <div className="address-inputs">
                    <input
                        type="text"
                        value={address}
                        onChange={(event: any) => setAddress(event.target.value)}
                        placeholder="Address"
                        className="form-input"
                    />
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(event: any) => setZipCode(event.target.value)}
                        placeholder="Zip Code"
                        className="form-input"
                    />
                </div>
                <div className="city-state-inputs">
                    <input
                        type="text"
                        value={city}
                        onChange={(event: any) => setCity(event.target.value)}
                        placeholder="City"
                        className="form-input"
                    />
                    <input
                        type="text"
                        value={state}
                        onChange={(event: any) => setState(event.target.value)}
                        placeholder="State"
                        className="form-input"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Complete Profile</button>
            </form>
        </div>
    );
}

export default CompleteProfileForm;