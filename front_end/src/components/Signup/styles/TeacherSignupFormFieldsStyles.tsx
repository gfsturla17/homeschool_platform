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

export const ErrorMessage = styled.p`
    color: red;
    white-space: pre-wrap;
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