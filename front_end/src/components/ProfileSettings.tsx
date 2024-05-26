import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { getTeacherProfile, updateTeacherProfileAction } from "../store/teacherSlice";
import { AppDispatch, RootState } from "../store/store";
import TeacherProfile from "../models/TeacherProfile";
import Button from "./Common/Button";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";

const Container = styled.div`
    width: 85%;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5; // light grey background
`;

const Header = styled.h1`
    margin-bottom: 20px;
`;

const SectionsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const LeftSection = styled.div`
    width: 30%;
    padding: 10px;
`;

const RightSection = styled.div`
    width: 70%;
    padding: 10px;
`;

const ProfilePhoto = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #ccc;
    margin: 20px auto;
    font-size: 100px;
    text-align: center;
    line-height: 200px;
    color: #fff; // white letter
`;

const UploadButton = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #aaa;
    cursor: pointer;
`;

const Section = styled.div`
    background-color: #fff; // white section
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // add shadow
`;

const Heading = styled.h2`
    margin-top: 0;
`;

const FormGroup = styled.div`
    margin-bottom: 10px;
    position: relative;
`;

const Label = styled.label`
    position: absolute;
    top: 20px;
    left: 10px;
    font-size: 14px;
    transition: all 0.3s ease;
    color: #999;
    pointer-events: none;
`;

const Input = styled.input`
    width: 80%;
    padding: 10px;
    padding-top: 20px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #ccc;

    &:focus {
        outline: none;
        border-bottom: 1px solid blue; // change to blue when input is active
    }

    &:not(:placeholder-shown) + ${Label}, &:focus + ${Label} {
        top: 0;
        font-size: 12px;
        color: #aaa;
    }

    &:focus + ${Label} {
        color: blue; // change to blue when input is active
    }
`;

const TextArea = styled.textarea`
    width: 80%;
    padding: 10px;
    padding-top: 20px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #ccc;

    &:focus {
        outline: none;
        border-bottom: 1px solid #aaa;
    }

    &:not(:placeholder-shown) + ${Label} {
        color: #aaa;
    }

    &:focus + ${Label} {
        color: #aaa;
    }
`;

const ProfileSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacherProfileData = useSelector((state: RootState) => state.teacher.profile);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({} as TeacherProfile);
  const [fetched, setFetched] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      // Handle file upload here
    };
    input.click();
  };

  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacher_id');
    if (!fetched && storedTeacherId) {
      dispatch(getTeacherProfile(storedTeacherId));
      setFetched(true);
    }
  }, [dispatch, fetched]);

  useEffect(() => {
    if (teacherProfileData) {
      setTeacherProfile(teacherProfileData);
    }
  }, [teacherProfileData]);

  const updateTeacherProfile = (newProfile: TeacherProfile) => {
    const hasActualChanges = Object.keys(newProfile).some((key) => {
      return newProfile[key] !== teacherProfileData[key];
    });

    setHasChanges(hasActualChanges);
    setTeacherProfile(newProfile);
  };

  const handleSubmit = async () => {
    try {
      const teacherId = teacherProfileData.id;
      if (!teacherId) {
        throw new Error('Teacher ID not found');
      }

      const updateTeacherProfileRequestDTO: UpdateTeacherProfileRequestDTO = {
        firstName: teacherProfile.firstName,
        lastName: teacherProfile.lastName,
        email: teacherProfile.email,
        phone: teacherProfile.phone,
        address: teacherProfile.address,
        city: teacherProfile.city,
        state: teacherProfile.state,
        biography: teacherProfile.biography,
        tiktokLink: teacherProfile.tiktokLink,
        twitterLink: teacherProfile.twitterLink,
        facebookLink: teacherProfile.facebookLink,
        instagramLink: teacherProfile.instagramLink,
      };

      await dispatch(updateTeacherProfileAction({ id: teacherId, profile: updateTeacherProfileRequestDTO }));
      setHasChanges(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Header>Profile Settings</Header>
      {teacherProfileData ? (
        <SectionsContainer>
          <LeftSection>
            <ProfilePhoto>
              {teacherProfileData.firstName ? teacherProfileData.firstName.charAt(0).toUpperCase() : ''}
              <UploadButton onClick={handleUploadClick} />
            </ProfilePhoto>
            <Section>
              <Heading>About You</Heading>
              <FormGroup>
                <Input
                  type="text"
                  id="firstName"
                  placeholder=" "
                  value={teacherProfile?.firstName}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, firstName: e.target.value })}
                />
                <Label htmlFor="firstName">First Name</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="lastName"
                  placeholder=" "
                  value={teacherProfile?.lastName}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, lastName: e.target.value })}
                />
                <Label htmlFor="lastName">Last Name</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="biography"
                  placeholder=" "
                  value={teacherProfile?.biography}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, biography: e.target.value })}
                />
                <Label htmlFor="biography">Biography</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  id="experience"
                  placeholder=" "
                  value={teacherProfile?.experience}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, experience: Number(e.target.value) })}
                />
                <Label htmlFor="experience">Year of Teaching Experience</Label>
              </FormGroup>
            </Section>
            <Section>
              <Heading>Contact Information</Heading>
              <FormGroup>
                <Input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={teacherProfile?.email}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, email: e.target.value })}
                />
                <Label htmlFor="email">Email</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="tel"
                  id="phone"
                  placeholder=" "
                  value={teacherProfile?.phone}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, phone: e.target.value })}
                />
                <Label htmlFor="phone">Phone Number</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="address"
                  placeholder=" "
                  value={teacherProfile?.address}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, address: e.target.value })}
                />
                <Label htmlFor="address">Address</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="city"
                  placeholder=" "
                  value={teacherProfile?.city}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, city: e.target.value })}
                />
                <Label htmlFor="city">City</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  id="state"
                  placeholder=" "
                  value={teacherProfile?.state}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, state: e.target.value })}
                />
                <Label htmlFor="state">State</Label>
              </FormGroup>
            </Section>
            <Section>
              <Heading>Social Media Links</Heading>
              <FormGroup>
                <Input
                  type="url"
                  id="instagram"
                  placeholder=" "
                  value={teacherProfile?.instagramLink}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, instagramLink: e.target.value })}
                />
                <Label htmlFor="instagram">Instagram Link</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  id="tiktok"
                  placeholder=" "
                  value={teacherProfile?.tiktokLink}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, tiktokLink: e.target.value })}
                />
                <Label htmlFor="tiktok">TikTok Link</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  id="facebook"
                  placeholder=" "
                  value={teacherProfile?.facebookLink}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, facebookLink: e.target.value })}
                />
                <Label htmlFor="facebook">Facebook Link</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="url"
                  id="twitter"
                  placeholder=" "
                  value={teacherProfile?.twitterLink}
                  onChange={(e) => updateTeacherProfile({ ...teacherProfile, twitterLink: e.target.value })}
                />
                <Label htmlFor="twitter">Twitter Link</Label>
              </FormGroup>
            </Section>
          </LeftSection>
          <RightSection>
            <Section>
              <Heading>Privacy Settings</Heading>
              {/* Add privacy settings form here */}
            </Section>
            <Section>
              <Heading>Email Settings</Heading>
              {/* Add email settings form here */}
            </Section>
          </RightSection>
        </SectionsContainer>
      ) : (
        <p>Loading profile...</p>  // Loading indicator or message
      )}
      <Button
        disabled={!hasChanges}
        style={{
          backgroundColor: hasChanges ? 'green' : '#ccc',
          color: hasChanges ? 'white' : '#666',
        }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Container>
  );
};

export default ProfileSettings;
