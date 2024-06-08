import styled from 'styled-components';

export const CalendarContainer = styled.div`
    height: 700px;
`;

export const TimePickerContainer = styled.div`
    width: 25%;
    .react-time-picker {
        width: 100%;
    }

    .react-time-picker__inputGroup {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .react-time-picker__inputGroup__input {
        width: 50px !important; /* Override the width of the input field */
    }
`;