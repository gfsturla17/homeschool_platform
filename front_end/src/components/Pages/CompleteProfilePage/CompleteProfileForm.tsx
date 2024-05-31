import React, { useState } from "react";
import { ProfileButton, ProfileForm, ProfileInput } from "../styles/CompleteProfilePageStyles";
import useLoadScript from "../../../UseLoadScript";
import { googleMapsApiKey, googleMapsApiUrl } from "../../../env";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Set the API key globally


const CompleteProfilePage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setAddress(address);
    setCity(results[0].address_components[1].long_name);
    setState(results[0].address_components[3].short_name);
  };


  const scriptLoaded = useLoadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDDbM5Eyj3K6fqLPKBtrHPaQrekhwuzNA4&libraries=places`);

  return (
    <ProfileForm>
      {scriptLoaded ? (
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <ProfileInput
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      ) : (
        <div>Loading Google Maps...</div>
      )}
      <ProfileInput value={city} onChange={(e) => setCity(e.target.value)} />
      <ProfileInput value={state} onChange={(e) => setState(e.target.value)} />
      <ProfileButton type="submit">Complete Profile</ProfileButton>
    </ProfileForm>
  );
};

export default CompleteProfilePage;
