// components/LandingPage.tsx
import './LandingPage.scss';
import React from 'react';
import LoginForm from './LoginForm';


function LandingPage() {
    return (
        <div className="landing-page">
            <div className="content-container">
                <div className="text-container">
                    <h1>Discover Your Homeschooling Partner!</h1>
                    <p>Explore top educators dedicated to empowering your child's learning journey at home.</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

export default LandingPage;