//ResourceCardStyles
import styled from "styled-components";

export const ResourceCardContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

export const IconContainer = styled.div`
    margin-right: 20px;
    font-size: 40px;
`;

export const InfoContainer = styled.div`
    flex-grow: 1;
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ViewButton = styled.button`
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;

export const EditButton = styled.button`
    background-color: #e67e22;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d35400;
    }
`;

export const DeleteButton = styled.button`
    background-color: #e74c3c;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c0392b;
    }
`;