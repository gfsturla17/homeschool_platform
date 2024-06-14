import React, { useEffect, useState } from "react";
import { TimePickerContainer } from './TeacherAvailabilityStyles';
import { ModalBackground, ModalContainer } from "../../Common/styles/shared-styles";
import TimePicker from "../../Common/TimePicker";

const TeacherAvailabilityModal = ({ onClose, selectedDate, handleAddEvent, selectedEvent, handleUpdateEvent  }) => {
  const [repeatFrequency, setRepeatFrequency] = useState(selectedEvent ? selectedEvent.repeatFrequency : 'NONE');
  const [startTime, setStartTime] = useState(selectedEvent ? new Date(selectedEvent.start) : new Date());
  const [endTime, setEndTime] = useState(selectedEvent ? new Date(selectedEvent.end) : new Date());
  useEffect(() => {
    if (selectedEvent) {
      setStartTime(new Date(selectedEvent.start));
      setEndTime(new Date(selectedEvent.end));
      setRepeatFrequency(selectedEvent.repeatFrequency || 'NONE');

    } else {
      setStartTime(new Date(selectedDate));
      setEndTime(new Date(selectedDate));
    }
  }, [selectedEvent, selectedDate]);

  const handleSave = () => {
    console.log('Save button clicked');
    console.log('Selected Event:', selectedEvent);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Repeat Frequency:', repeatFrequency);

    if (selectedEvent) {
      handleUpdateEvent({
        id: selectedEvent.id,
        start: startTime,
        end: endTime,
        repeatFrequency,
      });
    } else {
      handleAddEvent({
        start: startTime,
        end: endTime,
        repeatFrequency,
      });
    }
    onClose();
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
            <option value="NONE">None</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
        <div>
          <label>Start Time:</label>
          <TimePickerContainer>
            <TimePicker
              time={startTime}
              onChange={(newTime) => setStartTime(newTime)}
            />
          </TimePickerContainer>
        </div>
        <div>
          <label>End Time:</label>
          <TimePickerContainer>
            <TimePicker
              time={endTime}
              onChange={(newTime) => setEndTime(newTime)}
            />
          </TimePickerContainer>
        </div>
        <button onClick={handleSave}>Save</button>
      </ModalContainer>
    </ModalBackground>
  );
}

export default TeacherAvailabilityModal;