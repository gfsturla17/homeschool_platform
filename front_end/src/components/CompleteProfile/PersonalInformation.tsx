
import LabeledTextInput from "../Common/LabeledTextInput";
import React from "react";

export interface PersonalInformationProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  profilePictureUrl: string;
  setProfilePictureUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ firstName, setFirstName, lastName, setLastName, profilePictureUrl, setProfilePictureUrl }) => {
  return (
    <div>
      <LabeledTextInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <LabeledTextInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <LabeledTextInput value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} placeholder="Profile Picture URL" />
    </div>
  );
};

export default PersonalInformation;

