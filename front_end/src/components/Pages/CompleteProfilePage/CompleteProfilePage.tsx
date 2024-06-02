import React, { useEffect, useState } from "react";
import {
  AutocompleteDropdownContainer,
  ProfileForm,
  SuggestionItem,
  AutocompleteContainer
} from "../styles/CompleteProfilePageStyles";
import useLoadScript from "../../../helpers/UseLoadScript";
import { googleMapsApiKey, googleMapsApiUrl } from "../../../env";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressSection, { AddressSectionProps } from "../../CompleteProfile/AddressSection";
import BiographySection, { BiographySectionProps } from "../../CompleteProfile/BiographySection";
import SocialMediaSection, { SocialMediaSectionProps } from "../../CompleteProfile/SocialMediaSection";
import PersonalInformation, { PersonalInformationProps } from "../../CompleteProfile/PersonalInformation";
import CompleteProfileFormSection, { Section } from "../../CompleteProfile/CompleteProfileFormSection";



const CompleteProfilePage = () => {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [biography, setBiography] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [scriptUrl, setScriptUrl] = useState('')

  useEffect(() => {
    if (googleMapsApiKey) {
      setScriptUrl(`${googleMapsApiUrl}?key=${googleMapsApiKey}&libraries=places`);
    }
  }, [googleMapsApiKey]);

  const handleSelect = async (address) => {
    console.log("Selected address:", address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);

    setCity(results[0].address_components[1].long_name);
    setState(results[0].address_components[3].short_name);
  };

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const onSkip = () => {};

  const onCompleteProfile = () => {};

  const scriptLoaded = useLoadScript(scriptUrl);

  const sections: Section[] = [
    {
      title: 'Personal Information',
      component: PersonalInformation,
      props: {
        firstName: firstName,
        lastName: lastName,
        profilePictureUrl: profilePictureUrl,
        setFirstName: setFirstName,
        setLastName: setLastName,
        setProfilePictureUrl: setProfilePictureUrl
      }
    },
    {
      title: 'Address Section',
      component: AddressSection,
      props: {
        address: address,
        city: city,
        state: state,
        scriptLoaded: scriptLoaded,
        setAddress: setAddress,
        setCity: setCity,
        setState: setState,
        handleSelect: handleSelect
      }
    },
    {
      title: 'Biography Section',
      component: BiographySection,
      props: {
        biography: biography,
        setBiography: setBiography
      }
    },
    {
      title: 'Social Media Section',
      component: SocialMediaSection,
      props: {
        tiktokLink: tiktokLink,
        twitterLink: twitterLink,
        instagramLink: instagramLink,
        facebookLink: facebookLink,
        setTiktokLink: setTiktokLink,
        setTwitterLink: setTwitterLink,
        setFacebookLink: setFacebookLink,
        setInstagramLink: setInstagramLink
      }
    },
  ];

  return (
    <div>
      <h1>Complete Profile</h1>
      <ProfileForm>
        {sections.map((section, index) => (
          <div key={section.title}>
            {step === index && (
              <CompleteProfileFormSection
                title={section.title}
                onNext={index === sections.length - 1 ? onCompleteProfile : onNext}
                onPrevious={index === 0 ? null : onPrevious}
                onSkip={index === sections.length - 1 ? null : onSkip}
                isLastStep={index === sections.length - 1}
              >
                {React.createElement(section.component as React.ElementType, section.props)}
              </CompleteProfileFormSection>
            )}
          </div>
        ))}
      </ProfileForm>
    </div>
  );
};

export default CompleteProfilePage;
