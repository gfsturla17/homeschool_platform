import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import TeacherAvailabilityModal from './TeacherAvailabilityModal';
import { CalendarContainer } from './TeacherAvailabilityStyles';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { createTeacherAvailability} from "../../../services/teacherAvailabilityService";
import {
  useCreateTeacherAvailabilityMutation,
  useGetTeacherAvailabilityQuery,
  useUpdateTeacherAvailabilityMutation
} from "../../../generated/graphql";

const localizer = momentLocalizer(moment);
const TeacherAvailabilityCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const teacherId = useSelector((state: RootState) => state.auth.id);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: teacherAvailabilityData, error: teacherAvailabilityError, loading: teacherAvailabilityLoading } = useGetTeacherAvailabilityQuery({
    variables: { teacherId },
  });

  const [createTeacherAvailability, { data, error: createError, loading: createLoading }] = useCreateTeacherAvailabilityMutation();
  const [updateTeacherAvailability, { data: updateData, error: updateError, loading: updateLoading }] = useUpdateTeacherAvailabilityMutation();


  useEffect(() => {

    if (teacherAvailabilityData) {
      const availabilities = teacherAvailabilityData.getTeacherAvailability;
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
              id: availability.id, // Include the id of the availability
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
              id: availability.id, // Include the id of the availability
              start: newStartDate,
              end: newEndDate,
            });
            newStartDate = new Date(newStartDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            newEndDate = new Date(newEndDate.getTime() + 30 * 24 * 60 * 60 * 1000);
          }
        } else {
          events.push({
            id: availability.id, // Include the id of the availability
            start: startDate,
            end: endDate,
          });
        }
      });
      setEvents(events);
    }
  }, [teacherAvailabilityData]);

  const handleSelect = ({ start, end }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setModalOpen(true);
    setSelectedEvent(event);
  };

  const handleUpdateEvent = (event) => {
    updateTeacherAvailability({
      variables: {
        teacherId,
        availabilityId: parseFloat(selectedEvent.id),
        availability: {
          startDateTime: event.start.toISOString(),
          endDateTime: event.end.toISOString(),
          repeatFrequency: event.repeatFrequency,
        },
      },
    }).then((result) => {
      const updatedEvents = events.map((e) => {
        if (e.id === selectedEvent.id) {
          return { ...e, ...event };
        }
        return e;
      });
      setEvents(updatedEvents);
    }).catch((error) => {
      console.error('Update error:', error); // Log the error
    });

    setModalOpen(false);
  };

  const handleAddEvent = (event) => {
    console.log('Adding event:', event);
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

    createTeacherAvailability({
      variables: {
        teacherId,
        availability: {
          startDateTime: startDate.toISOString(),
          endDateTime: endDate.toISOString(),
          repeatFrequency: event.repeatFrequency,
        },
      },
    }).then((result) => {
      const newEvent = result.data.createTeacherAvailability;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setSelectedEvent(newEvent); // Update the selectedEvent state
    }).catch((error) => {
      console.error(error);
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
          onSelectEvent={handleSelectEvent} // Add this line
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
          handleUpdateEvent={handleUpdateEvent}
          selectedEvent={selectedEvent}

        />
      )}
    </div>
  );
};

export default TeacherAvailabilityCalendar;