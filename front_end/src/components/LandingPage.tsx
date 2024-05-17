import React, { useState } from 'react';
import LoginForm from './LoginForm';
import Header from './Header';
import styled from 'styled-components';

const LandingPageWrapper = styled.div`
  height: 90vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20vh;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  margin-right: 20px;
`;

function LandingPage() {
    const [isTeacher, setIsTeacher] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleTeacherClick = () => {
        setIsTeacher(true);
    }

    const handleParentClick = () => {
        setIsTeacher(false);
    }

    return (
      <LandingPageWrapper>
          <ContentContainer>
              <TextContainer>
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
              </TextContainer>
              <LoginForm isTeacher={isTeacher} onTeacherClick={handleTeacherClick} onParentClick={handleParentClick} />
          </ContentContainer>
      </LandingPageWrapper>
    );
}

export default LandingPage;