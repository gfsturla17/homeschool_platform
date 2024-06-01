import React, { useEffect, useState } from "react";
import {
  AutocompleteDropdownContainer,
  ProfileForm,
  SuggestionItem
} from "../styles/CompleteProfilePageStyles";
import useLoadScript from "../../../UseLoadScript";
import { googleMapsApiKey, googleMapsApiUrl } from "../../../env";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SubmitButton from "../../Common/SubmitButton";
import LabeledTextInput from "../../Common/LabeledTextInput";
import FlexContainer from "../../Common/Containers/FlexContainer";

const CompleteProfilePage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [biography, setBiography] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [scriptUrl, setScriptUrl] = useState('');

  useEffect(() => {
    if (googleMapsApiKey) {
      setScriptUrl(`${googleMapsApiUrl}?key=${googleMapsApiKey}&libraries=places`);
    }
  }, [googleMapsApiKey]);

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);

    setCity(results[0].address_components[1].long_name);
    setState(results[0].address_components[3].short_name);
  };


  const scriptLoaded = useLoadScript(scriptUrl);
  return (
    <div>
      <h1>Complete Profile</h1>
      <ProfileForm style={{ marginTop: '20px' }}>
        {scriptLoaded ? (
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <h2>Address Section</h2>
                <LabeledTextInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Search Places..."
                />
                {suggestions.length > 0 && ( // Conditionally render the dropdown container
                  <AutocompleteDropdownContainer>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const { key, ...rest } = getSuggestionItemProps(suggestion); // Destructure the key prop
                      return (
                        <SuggestionItem key={suggestion.placeId || index}>
                          <div
                            {...rest} // Spread the rest of the props
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        </SuggestionItem>
                      );
                    })}
                  </AutocompleteDropdownContainer>
                )}
                <LabeledTextInput value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <LabeledTextInput value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
              </div>
            )}
          </PlacesAutocomplete>
        ) : (
          <div>Loading Google Maps...</div>
        )}
        <h2>Biography Section</h2>
        <LabeledTextInput value={biography} onChange={(e) => setBiography(e.target.value)} placeholder="Biography" />
        <LabeledTextInput value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} placeholder="Profile Picture URL" />
        <h2>Social Media Section</h2>
        <LabeledTextInput value={tiktokLink} onChange={(e) => setTiktokLink(e.target.value)} placeholder="TikTok Link" />
        <LabeledTextInput value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} placeholder="Twitter Link" />
        <LabeledTextInput value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} placeholder="Facebook Link" />
        <LabeledTextInput value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} placeholder="Instagram Link" />
        <FlexContainer justifyContent="flex-end">
          <SubmitButton type="submit">Complete Profile</SubmitButton>
        </FlexContainer>
      </ProfileForm>
    </div>
  );

};

export default CompleteProfilePage;