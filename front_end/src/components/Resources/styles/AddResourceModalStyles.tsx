//AddResourceModalStyles
import styled from "styled-components";
export const Input = styled.input<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

export const TextArea = styled.textarea<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
    resize: vertical; /* Restrict resize to only vertical */
    max-height: 150px; /* Set a maximum height for the textarea */
`;

export const Select = styled.select<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileInputLabel = styled.label`
    display: block;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
`;

export const LinkInput = styled.input<{ hasError: boolean }>`
    width: calc(100% - 20px);  /* Adjust width to fit within padding */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${props => props.hasError ? 'red' : '#ccc'};
    border-radius: 5px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;