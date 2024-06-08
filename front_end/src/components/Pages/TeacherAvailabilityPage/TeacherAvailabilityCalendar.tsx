import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import TeacherAvailabilityModal from './TeacherAvailabilityModal';
import { CalendarContainer } from './TeacherAvailabilityStyles';

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { createTeacherAvailability, getTeacherAvailability } from "../../../services/teacherAvailabilityService";

const localizer = momentLocalizer(moment);

const TeacherAvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const teacherId = useSelector((state: RootState) => state.auth.id);

  useEffect(() => {
    getTeacherAvailability(teacherId).then((teacherAvailability) => {
      const events = teacherAvailability.map((availability) => ({
        start: new Date(availability.startDateTime),
        end: new Date(availability.endDateTime),
      }));
      setEvents(events);
    });
  }, [teacherId]);

  const handleSelect = ({ start, end }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleAddEvent = (event) => {
    const newEvents = [];
    const startDate = event.start;
    const endDate = event.end;

    if (event.repeatFrequency === 'weekly') {
      for (let i = 0; i < 52; i++) {
        const newStartDate = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        const newEndDate = new Date(endDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        newEvents.push({
          start: newStartDate,
          end: newEndDate,
        });
      }
    } else if (event.repeatFrequency === 'bi-weekly') {
      for (let i = 0; i < 26; i++) {
        const newStartDate = new Date(startDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
        const newEndDate = new Date(endDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
        newEvents.push({
          start: newStartDate,
          end: newEndDate,
        });
      }
    } else if (event.repeatFrequency === 'monthly') {
      for (let i = 0; i < 12; i++) {
        const newStartDate = new Date(startDate.getTime() + i * 30 * 24 * 60 * 60 * 1000);
        const newEndDate = new Date(endDate.getTime() + i * 30 * 24 * 60 * 60 * 1000);
        newEvents.push({
          start: newStartDate,
          end: newEndDate,
        });
      }
    }

    createTeacherAvailability(teacherId, event).then((newEvent) => {
      setEvents([...events, ...newEvents]);
    });

    setModalOpen(false);
  };

  return (
    <div>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
          selectable
          defaultView="month"
        />
      </CalendarContainer>
      {modalOpen && (
        <TeacherAvailabilityModal
          onClose={() => setModalOpen(false)}
          selectedDate={selectedDate}
          handleAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

export default TeacherAvailabilityCalendar;