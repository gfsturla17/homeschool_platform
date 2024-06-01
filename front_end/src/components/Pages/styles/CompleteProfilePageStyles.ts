import styled from 'styled-components';
import { Button, Form, Input } from "../../Common/styles/shared-styles";


export const ProfileForm = styled(Form)`
    margin-top: 50px;
`;

export const ProfileButton = styled(Button)`
    margin-top: 20px;
`;

export const AutocompleteDropdownContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    z-index: 1;
`;

export const SuggestionItem = styled.div`
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    &:hover {
        background-color: #f9f9f9;
    }

    &.suggestion-item--active {
        background-color: #f0f0f0;
    }
`;