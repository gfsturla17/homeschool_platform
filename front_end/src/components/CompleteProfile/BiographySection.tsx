// BiographySection.js
import React from 'react';
import LabeledTextInput from "../Common/LabeledTextInput";

export interface BiographySectionProps  {
  biography: string;
  setBiography: React.Dispatch<React.SetStateAction<string>>;
}

const BiographySection: React.FC<BiographySectionProps> = ({ biography, setBiography }) => {  return (
      <div>
        <LabeledTextInput value={biography} onChange={(e) => setBiography(e.target.value)} placeholder="Biography" />
      </div>
  );
};

export default BiographySection;