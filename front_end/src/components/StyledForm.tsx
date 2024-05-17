// components/StyledForm.tsx
import styled from 'styled-components';

export const FormContainer = styled.form`
    width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    display: flex;
    flex-direction: column;
`;

export const FormInput = styled.input`
    padding: 10px;
    border: 1px solid ${(props) => props.theme.colors.inputBorder};
    margin-bottom: 15px;
    border-radius: 4px;
    width: 100%;
    background-color: ${(props) => props.theme.colors.inputBackground};
    color: ${(props) => props.theme.colors.text};
`;

export const FormButton = styled.button`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.text};
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px; // Ensure there's margin so it's not too close to other elements

    &:hover {
        background-color: ${(props) => props.theme.colors.secondary};
    }
`;

export const ToggleButton = styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: none;
    cursor: pointer;
    margin-top: 10px;
`;

export const ForgotPasswordText = styled.p`
    margin-top: 10px;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
`;

export const PasswordInputContainer = styled.div`
    margin-bottom: 15px;
`;
