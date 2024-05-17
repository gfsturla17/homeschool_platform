// styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
        font-family: 'Arial, sans-serif';
    }
    .form-input {
        padding: 10px;
        border: 1px solid ${(props) => props.theme.colors.primary};
        margin-bottom: 10px;
        border-radius: 4px;
    }
    .submit-button {
        background-color: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.text};
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

export default GlobalStyle;