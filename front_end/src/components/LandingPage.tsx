import './LandingPage.scss';
import './LoginSheet.scss';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

function LandingPage() {
    const [isTeacher, setIsTeacher] = useState(false);

    const handleTeacherClick = () => {
        setIsTeacher(true);
    }

    const handleParentClick = () => {
        setIsTeacher(false);
    }

    return (
        <div className="landing-page">
            <div className="content-container">
                <div className="text-container">
                    {!isTeacher && (
                        <>
                            <h1>Discover Your Homeschooling Partner!</h1>
                            <p>Explore top educators dedicated to empowering your child's learning journey at home.</p>
                        </>
                    )}
                    {isTeacher && (
                        <>
                            <h1>Welcome Teachers!</h1>
                            <p>Empower your students with our homeschooling platform and discover new ways to teach.</p>
                        </>
                    )}
                </div>
                <LoginForm isTeacher={isTeacher} onTeacherClick={handleTeacherClick} onParentClick={handleParentClick} />
            </div>
        </div>
    );
}

export default LandingPage;