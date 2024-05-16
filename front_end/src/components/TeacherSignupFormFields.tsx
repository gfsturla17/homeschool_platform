import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { registerTeacher } from '../store/teacherSlice';
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { useNavigate } from 'react-router-dom';

const TeacherSignupFormFields: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacher = useSelector((state: RootState) => state.teacher);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userRegistration: RegisterTeacherDTO = {
      email,
      password
    };

    dispatch(registerTeacher(userRegistration)).unwrap().then(() => {
      navigate('/complete-profile'); // navigate to the CompleteProfileForm component
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Teacher Sign Up</h2>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email Address" className="form-input" />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="form-input" />
      <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" className="form-input" />
      {teacher.error && <p className="error-message">{teacher.error}</p>}
      <button type="submit" className="submit-button">Sign up</button>
    </form>
  );
};

export default TeacherSignupFormFields;