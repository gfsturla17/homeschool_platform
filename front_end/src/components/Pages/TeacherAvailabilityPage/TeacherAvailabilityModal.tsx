import React, { useState } from 'react';
import { TimePickerContainer } from './TeacherAvailabilityStyles';
import { ModalBackground, ModalContainer } from "../../Common/styles/shared-styles";
import TimePicker from "../../Common/TimePicker";

const TeacherAvailabilityModal = ({ onClose, selectedDate, handleAddEvent }) => {
  const [repeatFrequency, setRepeatFrequency] = useState('weekly');
  const [startTime, setStartTime] = useState(new Date('2022-01-01 08:00')); // Initialize with a Date object
  const [endTime, setEndTime] = useState(new Date('2022-01-01 17:00')); // Initialize with a Date object

  const handleSave = () => {
    handleAddEvent({
      start: new Date(`${selectedDate.toDateString()} ${startTime.getHours()}:${startTime.getMinutes()}`),
      end: new Date(`${selectedDate.toDateString()} ${endTime.getHours()}:${endTime.getMinutes()}`),
      repeatFrequency,
    });
    onClose();
  };

  const handleTimeChange = (value: string, setState: (date: Date) => void) => {
    const [hours, minutes] = value.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    setState(date);
  };

  return (
    <ModalBackground onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <ModalContainer>
        <h2>Add Availability</h2>
        <div>
          <label>Repeat Frequency:</label>
          <select value={repeatFrequency} onChange={(e) => setRepeatFrequency(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label>Start Time:</label>
          <TimePickerContainer>
            <TimePicker></TimePicker>
          </TimePickerContainer>
        </div>
        <div>
          <label>End Time:</label>
          <TimePickerContainer>
            <TimePicker></TimePicker>
          </TimePickerContainer>
        </div>
        <button onClick={handleSave}>Save</button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default TeacherAvailabilityModal;