import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from 'styled-components'; // Make sure to import this from your styled-components library

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Container = styled.div`
    position: relative;
    width: 80%;
    margin: 20px auto; // Add a margin of 20px to create space between input fields
`;

const Input = styled.input`
    padding: 16px 12px 12px 12px; // Adjust the top padding to 16px
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    font-size: 16px;
`;

const Label = styled.label`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
    pointer-events: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.inactive};

    &.active {
        font-size: 12px;
        top: 12px; // Increase the top value by 2px
        color: ${({ theme }) => theme.colors.active};
        padding-bottom: 10px;
        padding-top: 5px;
    }
`;

const LabeledTextInput: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsActive(false);
    }
  };

  return (
    <Container>
      <Input
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Label className={isActive || value ? 'active' : ''}>
        {placeholder}
      </Label>
    </Container>
  );
};

export default LabeledTextInput;