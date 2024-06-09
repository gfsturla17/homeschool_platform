import axiosInstance from "../axios/axios";

const getTeacherAvailability = (teacherId) => {
  return axiosInstance
    .get(`http://localhost:3000/graphql?query={getTeacherAvailability(teacherId: ${teacherId}) {id, startDateTime, endDateTime, repeatFrequency, repeatUntil}}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-apollo-operation-name': 'getTeacherAvailability',
      },
    })
    .then((response) => {
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      const availabilities = response.data.data.getTeacherAvailability;
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

      return events;
    });
};

const createTeacherAvailability = (teacherId, event) => {
  return axiosInstance
    .post('http://localhost:3000/graphql', {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      query: `mutation {createTeacherAvailability(teacherId: ${teacherId}, availability: {startDateTime: "${event.start.toISOString()}", endDateTime: "${event.end.toISOString()}", repeatFrequency: "${event.repeatFrequency}"}) {id}}`,
    })
    .then((response) => response.data.data.createTeacherAvailability);
};

export { getTeacherAvailability, createTeacherAvailability };