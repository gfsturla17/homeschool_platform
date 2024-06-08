import React, { useEffect, useState } from "react";
import {
  AutocompleteDropdownContainer,
  ProfileForm,
  SuggestionItem,
  AutocompleteContainer
} from "./CompleteProfilePageStyles";
import useLoadScript from "../../../helpers/UseLoadScript";
import { googleMapsApiKey, googleMapsApiUrl } from "../../../env";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressSection, { AddressSectionProps } from "../../CompleteProfile/AddressSection";
import BiographySection, { BiographySectionProps } from "../../CompleteProfile/BiographySection";
import SocialMediaSection, { SocialMediaSectionProps } from "../../CompleteProfile/SocialMediaSection";
import PersonalInformation, { PersonalInformationProps } from "../../CompleteProfile/PersonalInformation";
import CompleteProfileFormSection, { Section } from "../../CompleteProfile/CompleteProfileFormSection";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";
import { updateTeacherProfileAction } from "../../../store/teacherSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfilePictureSection from "../../CompleteProfile/ProfilePictureSection";



const CompleteProfilePage = () => {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [lastName, setLastName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [address, setAddress] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [biography, setBiography] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [scriptUrl, setScriptUrl] = useState('')
  const [skippedSections, setSkippedSections] = useState<{ [key: string]: boolean }>({});
  const dispatch: AppDispatch = useDispatch();
  const teacherId = useSelector((state: RootState) => state.auth.id);
  const navigate = useNavigate();


  useEffect(() => {
    if (googleMapsApiKey) {
      setScriptUrl(`${googleMapsApiUrl}?key=${googleMapsApiKey}&libraries=places`);
    }
  }, [googleMapsApiKey]);

  const handleSelect = async (address: string) => {
    setOriginalAddress(address);

    const results = await geocodeByAddress(address);
    const addressComponents = results[0].address_components;
    const streetNumber = addressComponents.find((component) => component.types.includes('street_number'));
    const street = addressComponents.find((component) => component.types.includes('route'));

    const streetAddress = `${streetNumber?.long_name || ''} ${street?.long_name || ''}`.trim();
    setAddress(streetAddress);
    setCity(addressComponents.find((component) => component.types.includes('locality'))?.long_name || '');
    setState(addressComponents.find((component) => component.types.includes('administrative_area_level_1'))?.short_name || '');
  };

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const scriptLoaded = useLoadScript(scriptUrl);
  const sections: Section[] = [
    {
      title: 'Profile Picture',
      component: ProfilePictureSection,
      props: {
        profilePicture: profilePicture,
        setProfilePicture: setProfilePicture,
      },
    },
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
        zipCode: zipCode,
        scriptLoaded: scriptLoaded,
        setAddress: setAddress,
        setCity: setCity,
        setState: setState,
        setZipCode: setZipCode,
        handleSelect: handleSelect,
        originalAddress: originalAddress
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


  const onCompleteProfile = async () => {
    try{
      const profile: UpdateTeacherProfileRequestDTO = {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        biography: '',
        tiktokLink: '',
        twitterLink: '',
        facebookLink: '',
        instagramLink: '',
      };

      sections.forEach((section) => {
        if (!skippedSections[section.title]) {
          switch (section.title) {
            case 'Personal Information':
              profile.firstName = firstName;
              profile.lastName = lastName;
              break;
            case 'Address Section':
              profile.address = address;
              profile.city = city;
              profile.state = state;
              break;
            case 'Biography Section':
              profile.biography = biography;
              break;
            case 'Social Media Section':
              profile.tiktokLink = tiktokLink;
              profile.twitterLink = twitterLink;
              profile.facebookLink = facebookLink;
              profile.instagramLink = instagramLink;
              break;
          }
        }
      });

      // Dispatch the action with the profile data
      const result = await dispatch(updateTeacherProfileAction({ id: teacherId, profile }));

      if (updateTeacherProfileAction.fulfilled.match(result)) {
        navigate('/home'); // Navigate to the TeacherDashboard page
      } else {
        toast.error('Failed to update profile', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Failed to update profile', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }

  const onSkip = () => {
    const currentSection = sections[step];
    setSkippedSections((prevSkippedSections) => ({ ...prevSkippedSections, [currentSection.title]: true }));
    onNext();
  };

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
