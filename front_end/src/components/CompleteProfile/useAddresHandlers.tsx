// useAddressHandlers.js
import { useState, useEffect, useRef } from "react";
import { geocodeByAddress } from "react-places-autocomplete";

export const useAddressHandlers = (originalAddress, setAddress, handleSelect) => {
  const [inputValue, setInputValue] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [autocompleteRef]);

  const handleInputChange = (value, setAddress) => {
    setAddress(value);
    setInputValue(value);
    setShowAutocomplete(true);
  };

  const handleZipCodeChange = async (
    zipCode,
    setZipCode,
    setCity,
    setState,
    setAddress
  ) => {
    setZipCode(zipCode);

    try {
      const results = await geocodeByAddress(zipCode);
      const addressComponents = results[0].address_components;
      const cityComponent = addressComponents.find((component) =>
        component.types.includes('locality')
      );
      const stateComponent = addressComponents.find((component) =>
        component.types.includes('administrative_area_level_1')
      );

      if (originalAddress) {
        const addressResults = await geocodeByAddress(originalAddress);
        const addressZipCode = addressResults[0].address_components.find((component) =>
          component.types.includes('postal_code')
        )?.long_name;

        if (addressZipCode !== zipCode) {
          setAddress('');
          setCity('');
          setState('');
        }
      }

      setCity(cityComponent?.long_name || '');
      setState(stateComponent?.short_name || '');
    } catch (error) {
      console.error(error);
    }
  };

  // const handleCityChange = async (city, setCity, setAddress, setZipCode, setState) => {
  //   setCity(city);
  //
  //   if (originalAddress) {
  //     const addressResults = await geocodeByAddress(originalAddress);
  //     const addressCity = addressResults[0].address_components.find((component) =>
  //       component.types.includes('locality')
  //     )?.long_name;
  //
  //     if (addressCity !== city) {
  //       setAddress('');
  //       setZipCode('');
  //       setState('');
  //     }
  //   }
  // };

  const handleCityChange = async (city, setCity, setAddress, setZipCode, setState) => {
    setCity(city);
    setAddress('');
    setZipCode('');
    setState('');
  };

  const handleStateChange = async (state, setState, setAddress, setCity, setZipCode) => {
    setState(state);

    if (originalAddress) {
      const addressResults = await geocodeByAddress(originalAddress);
      const addressState = addressResults[0].address_components.find((component) =>
        component.types.includes('administrative_area_level_1')
      )?.short_name;

      if (addressState !== state) {
        setAddress('');
        setCity('');
        setZipCode('');
      }
    }
  };

  const handleKeyDown = (suggestions) => (event) => {
    if (event.key === 'ArrowDown') {
      const nextSuggestion = suggestions.find((suggestion, index) => {
        if (highlightedSuggestion === null) {
          return index === 0;
        }
        return index === highlightedSuggestion + 1;
      });
      setHighlightedSuggestion(nextSuggestion ? suggestions.indexOf(nextSuggestion) : null);
    } else if (event.key === 'ArrowUp') {
      const previousSuggestion = suggestions.find((suggestion, index) => {
        if (highlightedSuggestion === null) {
          return index === suggestions.length - 1;
        }
        return index === highlightedSuggestion - 1;
      });
      setHighlightedSuggestion(previousSuggestion ? suggestions.indexOf(previousSuggestion) : null);
    } else if (event.key === 'Enter') {
      if (highlightedSuggestion !== null) {
        handleSelect(suggestions[highlightedSuggestion].description);
        setShowAutocomplete(false);
      }
    }
  };

  return {
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
  };
};