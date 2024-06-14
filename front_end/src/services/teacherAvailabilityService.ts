import axiosInstance from "../axios/axios";


const createTeacherAvailability = (teacherId, event) => {
  // return axiosInstance
  //   .post('http://localhost:3000/graphql', {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     query: `mutation {createTeacherAvailability(teacherId: ${teacherId}, availability: {startDateTime: "${event.start.toISOString()}", endDateTime: "${event.end.toISOString()}", repeatFrequency: "${event.repeatFrequency}"}) {id}}`,
  //   })
  //   .then((response) => response.data.data.createTeacherAvailability);
};

export { createTeacherAvailability };