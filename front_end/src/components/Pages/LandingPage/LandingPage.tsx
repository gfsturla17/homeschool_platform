import React, { useState } from 'react';
import LoginForm from '../../Login/LoginForm';
import { ContentContainer, LandingPageWrapper, TextContainer } from "./styles/LandingPageStyles";



function LandingPage() {
    const [isTeacher, setIsTeacher] = useState(false);

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