import React from 'react';
import './styles/TeacherDashboard.css';
import { FaChalkboardTeacher, FaClipboardList, FaBook, FaEnvelope, FaUser } from 'react-icons/fa';

interface Profile {
  name: string;
  email: string;
  bio: string;
}

interface Class {
  id: number;
  name: string;
  schedule: string;
}

interface Resource {
  id: number;
  title: string;
  link: string;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
}

interface Message {
  id: number;
  from: string;
  content: string;
}

const TeacherDashboard: React.FC = () => {
  // Placeholder data
  const profile: Profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Experienced Math teacher with over 10 years of teaching in various educational institutions.',
  };

  const classes: Class[] = [
    { id: 1, name: 'Math 101', schedule: 'Mon, Wed, Fri - 10:00 AM to 11:00 AM' },
    { id: 2, name: 'Science 101', schedule: 'Tue, Thu - 1:00 PM to 2:30 PM' },
  ];

  const sharedResources: Resource[] = [
    { id: 1, title: 'Algebra Basics', link: '#' },
    { id: 2, title: 'Chemistry 101', link: '#' },
  ];

  const assignments: Assignment[] = [
    { id: 1, title: 'Algebra Homework', dueDate: '2024-06-01' },
    { id: 2, title: 'Chemistry Lab Report', dueDate: '2024-06-08' },
  ];

  const messages: Message[] = [
    { id: 1, from: 'Parent A', content: 'Can you explain the homework for Algebra?' },
    { id: 2, from: 'Parent B', content: 'Thank you for the resources!' },
  ];

  return (
    <div className="teacher-dashboard">
      <header className="header">
        <h1>Teacher Dashboard</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Profile</li>
            <li>Classes</li>
            <li>Resources</li>
            <li>Assignments</li>
            <li>Messages</li>
          </ul>
        </nav>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <h2>Menu</h2>
          <ul>
            <li><FaUser /> Profile</li>
            <li><FaChalkboardTeacher /> Classes</li>
            <li><FaBook /> Resources</li>
            <li><FaClipboardList /> Assignments</li>
            <li><FaEnvelope /> Messages</li>
          </ul>
        </div>
        <div className="content">
          <div className="card profile-section">
            <h2><FaUser /> Profile</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>
          <div className="card classes-section">
            <h2><FaChalkboardTeacher /> Classes</h2>
            <ul>
              {classes.map(c => (
                <li key={c.id}>
                  <strong>{c.name}</strong> - {c.schedule}
                </li>
              ))}
            </ul>
          </div>
          <div className="card resources-section">
            <h2><FaBook /> Shared Resources</h2>
            <ul>
              {sharedResources.map(resource => (
                <li key={resource.id}>
                  <a href={resource.link}>{resource.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="card assignments-section">
            <h2><FaClipboardList /> Assignments</h2>
            <ul>
              {assignments.map(assignment => (
                <li key={assignment.id}>
                  <strong>{assignment.title}</strong> - Due: {assignment.dueDate}
                </li>
              ))}
            </ul>
          </div>
          <div className="card messages-section">
            <h2><FaEnvelope /> Messages</h2>
            <ul>
              {messages.map(message => (
                <li key={message.id}>
                  <strong>From:</strong> {message.from} - {message.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
