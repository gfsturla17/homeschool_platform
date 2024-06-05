import React from 'react';
import LabeledTextInput from "../Common/LabeledTextInput";

// SocialMediaSection component
export interface SocialMediaSectionProps  {
  tiktokLink: string;
  setTiktokLink: React.Dispatch<React.SetStateAction<string>>;
  twitterLink: string;
  setTwitterLink: React.Dispatch<React.SetStateAction<string>>;
  facebookLink: string;
  setFacebookLink: React.Dispatch<React.SetStateAction<string>>;
  instagramLink: string;
  setInstagramLink: React.Dispatch<React.SetStateAction<string>>;
}

const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({ tiktokLink, setTiktokLink, twitterLink, setTwitterLink, facebookLink, setFacebookLink, instagramLink, setInstagramLink }) => {
  return (
      <div>
        <LabeledTextInput value={tiktokLink} onChange={(e) => setTiktokLink(e.target.value)} placeholder="TikTok Link" />
        <LabeledTextInput value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} placeholder="Twitter Link" />
        <LabeledTextInput value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} placeholder="Facebook Link" />
        <LabeledTextInput value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} placeholder="Instagram Link" />
      </div>
  );
};

export default SocialMediaSection;