// AddressSection.js
import React from 'react';

import {
  AutocompleteContainer,
  AutocompleteDropdownContainer,
  SuggestionItem
} from "../Pages/styles/CompleteProfilePageStyles";
import LabeledTextInput from "../Common/LabeledTextInput";
import PlacesAutocomplete from "react-places-autocomplete";

export interface AddressSectionProps {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  scriptLoaded: boolean;
  handleSelect: (address: string) => Promise<void>;
}

const AddressSection: React.FC<AddressSectionProps> = ({ address, setAddress, city, setCity, state, setState, scriptLoaded, handleSelect }) => {
  return (
      <div>
        {scriptLoaded ? (
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <AutocompleteContainer>
                <LabeledTextInput
                  {...getInputProps({
                    placeholder: 'Search Places...',
                    className: 'location-search-input',
                  })}
                />
                {suggestions.length > 0 && (
                  <AutocompleteDropdownContainer>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                      const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      const { key, ...rest } = getSuggestionItemProps(suggestion);

                      return (
                        <SuggestionItem key={suggestion.placeId || index} className={className}>
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
        <LabeledTextInput value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        <LabeledTextInput value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
      </div>
  );
};

export default AddressSection;