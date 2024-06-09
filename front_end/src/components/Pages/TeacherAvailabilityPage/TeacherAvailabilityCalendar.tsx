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
import { useGetTeacherAvailabilityQuery } from "../../../generated/graphql";

const localizer = momentLocalizer(moment);


const TeacherAvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const teacherId = useSelector((state: RootState) => state.auth.id);
  const { loading, error, data } = useGetTeacherAvailabilityQuery( {
    variables: { teacherId },
  });

  useEffect(() => {
    if (data) {
      const availabilities = data.getTeacherAvailability;
      const events = [];

      availabilities.forEach((availability) => {
        const startDate = new Date(availability.startDateTime);
        const endDate = new Date(availability.endDateTime);
        const repeatUntil = availability.repeatUntil ? new Date(availability.repeatUntil) : new Date('2024-12-31'); // Default end date

        if (availability.repeatFrequency === 'WEEKLY') {
          let newStartDate = startDate;
          let newEndDate = endDate;
          while (newStartDate <= repeatUntil) {
            events.push({
              start: newStartDate,
              end: newEndDate,
            });
            newStartDate = new Date(newStartDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            newEndDate = new Date(newEndDate.getTime() + 7 * 24 * 60 * 60 * 1000);
          }
        } else if (availability.repeatFrequency === 'MONTHLY') {
          let newStartDate = startDate;
          let newEndDate = endDate;
          while (newStartDate <= repeatUntil) {
            events.push({
              start: newStartDate,
              end: newEndDate,
            });
            newStartDate = new Date(newStartDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            newEndDate = new Date(newEndDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          }
        } else {
          events.push({
            start: startDate,
            end: endDate,
          });
        }
      });

      setEvents(events);
    }
  }, [data]);

  const handleSelect = ({ start, end }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleAddEvent = (event) => {
    const newEvents = [];
    const startDate = event.start;
    const endDate = event.end;

    if (event.repeatFrequency === 'WEEKLY') {
      for (let i = 0; i < 52; i++) {
        const newStartDate = new Date(startDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        const newEndDate = new Date(endDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
        newEvents.push({
          start: newStartDate,
          end: newEndDate,
        });
      }
    } else if (event.repeatFrequency === 'MONTHLY') {
      for (let i = 0; i < 12; i++) {
        const newStartDate = new Date(startDate.getTime() + i * 30 * 24 * 60 * 60 * 1000);
        const newEndDate = new Date(endDate.getTime() + i * 30 * 24 * 60 * 60 * 1000);
        newEvents.push({
          start: newStartDate,
          end: newEndDate,
        });
      }
    } else {
      newEvents.push({
        start: startDate,
        end: endDate,
      });
    }

    createTeacherAvailability(teacherId, event).then((newEvent) => {
      setEvents([...events, ...newEvents]); // Update the state of the events
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