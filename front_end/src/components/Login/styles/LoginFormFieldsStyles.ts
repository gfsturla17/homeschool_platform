import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
`;

export const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const ForgotPasswordText = styled.p`
    color: #87CEEB;
    margin-bottom: 10px;
`;

export const SubmitButton = styled.button`
    background-color: #28a745;
    color: white;
    padding: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    width: 100%;
`;

export const ToggleSignupButton = styled.button`
    background-color: #0070e0;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
`;