import axiosInstance from "../axios/axios";

const getTeacherAvailability = (teacherId) => {
  return axiosInstance
    .get(`http://localhost:3000/graphql?query={getTeacherAvailability(teacherId: ${teacherId}) {id, startDateTime, endDateTime}}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'x-apollo-operation-name': 'getTeacherAvailability',
      },
    })
    .then((response) => {
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data.getTeacherAvailability;
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