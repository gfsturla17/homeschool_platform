import { getTeacherAvailability, createTeacherAvailability } from './teacherAvailabilityService';
import axios from 'axios';

jest.mock('axios');

describe('Teacher Availability Service', () => {
  // it('should get teacher availability', async () => {
  //   const teacherId = 1;
  //   const expectedResponse = {
  //     data: {
  //       data: {
  //         getTeacherAvailability: {
  //           id: 1,
  //           startDateTime: '2022-01-01T00:00:00.000Z',
  //           endDateTime: '2022-01-01T01:00:00.000Z',
  //           repeatFrequency: 'DAILY',
  //           repeatUntil: '2022-01-31T00:00:00.000Z',
  //         },
  //       },
  //     },
  //   };
  //
  //   axios.get.mockResolvedValue(expectedResponse);
  //
  //   const response = await getTeacherAvailability(teacherId);
  //   expect(response.data.data.getTeacherAvailability).toHaveProperty('id');
  // });

  // it('should create teacher availability', async () => {
  //   const teacherId = 1;
  //   const event = {
  //     start: new Date('2022-01-01T00:00:00.000Z'),
  //     end: new Date('2022-01-01T01:00:00.000Z'),
  //     repeatFrequency: 'DAILY',
  //   };
  //   const expectedResponse = {
  //     data: {
  //       data: {
  //         createTeacherAvailability: {
  //           id: 1,
  //         },
  //       },
  //     },
  //   };
  //
  //   axios.post.mockResolvedValue(expectedResponse);
  //
  //   const response = await createTeacherAvailability(teacherId, event);
  //   expect(response.data.data.createTeacherAvailability.id).toBeGreaterThan(0);
  // });
});