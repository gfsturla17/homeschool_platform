import React, { useState } from "react";
import {
  AutocompleteContainer,
  AutocompleteDropdownContainer,
  SuggestionItem
} from "../Pages/CompleteProfilePage/CompleteProfilePageStyles";
import LabeledTextInput from "../Common/LabeledTextInput";
import PlacesAutocomplete from "react-places-autocomplete";
import { STATES } from '../../constants/states';
import LabeledSelect from "../Common/LabeledSelect";
import { useAddressHandlers } from "./useAddresHandlers";


export interface AddressSectionProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  scriptLoaded: boolean;
  handleSelect: (address: string) => Promise<void>;
  originalAddress: string;
}

const AddressSection = ({
                          address,
                          setAddress,
                          city,
                          setCity,
                          state,
                          setState,
                          zipCode,
                          setZipCode,
                          scriptLoaded,
                          handleSelect,
                          originalAddress,
                        }) => {
  const {
    autocompleteRef,
    inputValue,
    showAutocomplete,
    handleInputChange,
    handleZipCodeChange,
    handleCityChange,
    handleStateChange,
    handleKeyDown,
    highlightedSuggestion,
    setShowAutocomplete,
  } = useAddressHandlers(originalAddress, setAddress, handleSelect);

  const handleSelectAndClose = (description) => {
    handleSelect(description);
    setShowAutocomplete(false);
  };

  return (
    <div>
      {scriptLoaded ? (
        <PlacesAutocomplete
          value={address}
          onChange={(value) => handleInputChange(value, setAddress)}
          onSelect={handleSelectAndClose}
          searchOptions={{
            types: ['address'],
            componentRestrictions: { country: 'us' },
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <AutocompleteContainer ref={autocompleteRef} onKeyDown={handleKeyDown(suggestions)}>
              <LabeledTextInput
                {...getInputProps({
                  placeholder: 'Address',
                  className: 'location-search-input',
                })}
              />
              {showAutocomplete && suggestions.length > 0 && (
                <AutocompleteDropdownContainer>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion, index) => {
                    const className = highlightedSuggestion === index ? 'suggestion-item--active' : 'suggestion-item';
                    const style = highlightedSuggestion === index ? { backgroundColor: '#ADD8E6', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    const { key, ...rest } = getSuggestionItemProps(suggestion);

                    return (
                      <SuggestionItem key={suggestion.placeId || index} className={className} style={style}>
                        <div {...rest}>
                          <span>{suggestion.description}</span>
                        </div>
                      </SuggestionItem>
                    );
                  })}
                </AutocompleteDropdownContainer>
              )}
            </AutocompleteContainer>
          )}
        </PlacesAutocomplete>
      ) : (
        <div>Loading Google Maps...</div>
      )}
      <LabeledTextInput value={zipCode} onChange={(e) => handleZipCodeChange(e.target.value, setZipCode, setCity, setState, setAddress)} placeholder="Zip Code" />
      <LabeledTextInput value={city} onChange={(e) => handleCityChange(e.target.value, setCity, setAddress, setZipCode, setState)} placeholder="City" />
      <LabeledSelect
        options={STATES}
        value={state}
        onChange={(value) => handleStateChange(value, setState, setAddress, setCity, setZipCode)}
        placeholder="State"
      />
    </div>
  );
};

export default AddressSection;
