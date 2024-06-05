// NavigationControlButton component
import styled from "styled-components";

export const NavigationControlButton = styled.button`
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.secondary};
    background: none;

    &:hover {
        font-weight: bold;
    }
`;