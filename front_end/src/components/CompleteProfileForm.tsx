import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getTeacherProfile } from '../store/teacherSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

const CompleteProfileForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const teacherId = useSelector((state: RootState) => state.teacher.id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [biography, setBiography] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [socialMediaLinks, setSocialMediaLinks] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const updateTeacherProfileRequestDTO = {
            firstName,
            lastName,
            address,
            city,
            state,
            biography,
            profilePictureUrl,
            socialMediaLinks,
        };

        axios.put(`http://127.0.0.1:3000/teachers/${teacherId}/profile`, updateTeacherProfileRequestDTO)
          .then((response) => {
              if (response.status === 200) {
                  toast.success('Profile updated successfully!');
              }
          })
          .catch((error) => {
              toast.error('Error updating profile!');
          });
    };

    return (
      <form onSubmit={handleSubmit} className="form">
          <h2>Complete Your Profile</h2>
          <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First Name" className="form-input" />
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last Name" className="form-input" />
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" className="form-input" />
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" className="form-input" />
          <input type="text" value={state} onChange={(event) => setState(event.target.value)} placeholder="State" className="form-input" />
          <textarea value={biography} onChange={(event) => setBiography(event.target.value)} placeholder="Biography" className="form-textarea" />
          <input type="text" value={profilePictureUrl} onChange={(event) => setProfilePictureUrl(event.target.value)} placeholder="Profile Picture URL" className="form-input" />
          <input type="text" value={socialMediaLinks} onChange={(event) => setSocialMediaLinks(event.target.value)} placeholder="Social Media Links" className="form-input" />
          <button type="submit" className="submit-button">Update Profile</button>
      </form>
    );
};

export default CompleteProfileForm;