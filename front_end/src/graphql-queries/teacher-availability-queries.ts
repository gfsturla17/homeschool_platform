import gql from 'graphql-tag';
const GET_TEACHER_AVAILABILITY_QUERY = gql`
    query GetTeacherAvailability($teacherId: Float!) {
        getTeacherAvailability(teacherId: $teacherId) {
            id
            startDateTime
            endDateTime
            repeatFrequency
            repeatUntil
        }
    }
`;

const CREATE_TEACHER_AVAILABILITY_MUTATION = gql`
    mutation CreateTeacherAvailability($teacherId: Float!, $availability: TeacherAvailabilityInput!) {
        createTeacherAvailability(teacherId: $teacherId, availability: $availability) {
            id
        }
    }
`;