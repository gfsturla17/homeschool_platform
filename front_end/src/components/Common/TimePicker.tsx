import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TimePickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TimePickerColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 5px;
    align-items: center;
`;

const TimePickerButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

const TimePicker = () => {
  const [hour, setHour] = useState(2);
  const [minute, setMinute] = useState(11);
  const [meridiem, setMeridiem] = useState('AM');

  const hours = Array(12).fill(0).map((_, i) => i + 1);
  const minutes = Array(60).fill(0).map((_, i) => i);
  const meridiems = ['AM', 'PM'];

  const [hourIndex, setHourIndex] = useState(2);
  const [minuteIndex, setMinuteIndex] = useState(11);
  const [meridiemIndex, setMeridiemIndex] = useState(0);

  const handleHourChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setHourIndex(hourIndex === 0 ? hours.length - 1 : hourIndex - 1);
    } else {
      setHourIndex(hourIndex === hours.length - 1 ? 0 : hourIndex + 1);
    }
    setHour(hours[hourIndex]);
  };

  const handleMinuteChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setMinuteIndex(minuteIndex === 0 ? minutes.length - 1 : minuteIndex - 1);
    } else {
      setMinuteIndex(minuteIndex === minutes.length - 1 ? 0 : minuteIndex + 1);
    }
    setMinute(minutes[minuteIndex]);
  };

  const handleMeridiemChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setMeridiemIndex(meridiemIndex === 0 ? meridiems.length - 1 : meridiemIndex - 1);
    } else {
      setMeridiemIndex(meridiemIndex === meridiems.length - 1 ? 0 : meridiemIndex + 1);
    }
    setMeridiem(meridiems[meridiemIndex]);
  };

  const getHoursToDisplay = () => {
    const hoursToDisplay = [];
    for (let i = hourIndex - 1; i <= hourIndex + 1; i++) {
      hoursToDisplay.push(hours[(i + hours.length) % hours.length]);
    }
    return hoursToDisplay;
  };

  const getMinutesToDisplay = () => {
    const minutesToDisplay = [];
    for (let i = minuteIndex - 1; i <= minuteIndex + 1; i++) {
      minutesToDisplay.push(minutes[(i + minutes.length) % minutes.length]);
    }
    return minutesToDisplay;
  };

  return (
    <TimePickerContainer>
      <TimePickerColumn>
        <TimePickerButton onClick={() => handleHourChange('up')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </TimePickerButton>
        {getHoursToDisplay().map((h, i) => (
          <div key={i} style={{
            fontSize: i === 1 ? '1.2em' : '0.8em',
            opacity: i === 1 ? 1 : 0.5,
            backgroundColor: i === 1 ? '#E7F4FF' : 'transparent',
            padding: '0 5px',
          }}>{h}</div>
        ))}
        <TimePickerButton onClick={() => handleHourChange('down')}>
          <FontAwesomeIcon icon={faChevronDown} />
        </TimePickerButton>
      </TimePickerColumn>
      <TimePickerColumn>
        <TimePickerButton onClick={() => handleMinuteChange('up')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </TimePickerButton>
        {getMinutesToDisplay().map((m, i) => (
          <div key={i} style={{
            fontSize: i === 1 ? '1.2em' : '0.8em',
            opacity: i === 1 ? 1 : 0.5,
            backgroundColor: i === 1 ? '#E7F4FF' : 'transparent',
            padding: '0 5px',
          }}>{m.toString().padStart(2, '0')}</div>
        ))}
        <TimePickerButton onClick={() => handleMinuteChange('down')}>
          <FontAwesomeIcon icon={faChevronDown} />
        </TimePickerButton>
      </TimePickerColumn>
      <TimePickerColumn>
        <TimePickerButton onClick={() => handleMeridiemChange('up')}>
          <FontAwesomeIcon icon={faChevronUp} />
        </TimePickerButton>
        {meridiems.slice(meridiemIndex).concat(meridiems.slice(0, meridiemIndex)).map((m, i) => (
          <div key={i} style={{
            fontSize: i === 1 ? '1.2em' : '0.8em',
            opacity: i === 1 ? 1 : 0.5,
            backgroundColor: i === 1 ? '#E7F4FF' : 'transparent',
            padding: '0 5px',
          }}>{m}</div>
        ))}
        <div>&nbsp;</div>
        <TimePickerButton onClick={() => handleMeridiemChange('down')} style={{ marginTop: '-1px' }}>
          <FontAwesomeIcon icon={faChevronDown} />
        </TimePickerButton>
      </TimePickerColumn>
    </TimePickerContainer>
  );
};

export default TimePicker;