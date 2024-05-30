import styled from 'styled-components';

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;  /* Ensures modal doesn't exceed screen width */
    position: relative;
`;

export const CloseIcon = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    cursor: pointer;
`;

export const Button = styled.button<{
  variant?: 'save' | 'delete';
}>`
    background-color: ${props => props.variant === 'save' ? '#3498db' : props.variant === 'delete' ? '#e74c3c' : '#4CAF50'};
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.variant === 'save' ? '#2980b9' : props.variant === 'delete' ? '#c0392b' : '#45A049'};
    }
`;