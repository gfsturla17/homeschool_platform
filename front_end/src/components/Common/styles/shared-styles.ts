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
    z-index: 1000; /* Add this line */
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

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
`;

export const Form = styled.form`
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CalendarContainer = styled.div`
  height: 700px;
`;

export const TimePickerContainer = styled.div`
  width: 25%; // 75% smaller than the original width
`;