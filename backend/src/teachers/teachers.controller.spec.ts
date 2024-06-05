import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from "./teachers.controller";
import { TeacherService } from "./teachers.service";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";

describe('TeachersController', () => {
  let controller: TeacherController;
  let teacherService: TeacherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: {
            updateTeacherProfile: jest.fn().mockResolvedValue({
              id: 1,
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'jane.doe@example.com',
              phone: '1234567890',
              address: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              biography: 'This is my biography',
              tiktokLink: 'https://tiktok.com/janedoe',
              twitterLink: 'https://twitter.com/janedoe',
              facebookLink: 'https://facebook.com/janedoe',
              instagramLink: 'https://instagram.com/janedoe',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    teacherService = module.get<TeacherService>(TeacherService);
  });





  it('should update teacher profile and return the updated profile', async () => {
    const updateRequestDTO = new UpdateTeacherProfileRequestDTO();
    updateRequestDTO.firstName = 'Jane';
    updateRequestDTO.lastName = 'Doe';
    updateRequestDTO.email = 'jane.doe@example.com';
    updateRequestDTO.phone = '1234567890';
    updateRequestDTO.address = '123 Main St';
    updateRequestDTO.city = 'Anytown';
    updateRequestDTO.state = 'CA';
    updateRequestDTO.biography = 'This is my biography';
    updateRequestDTO.tiktokLink = 'https://tiktok.com/janedoe';
    updateRequestDTO.twitterLink = 'https://twitter.com/janedoe';
    updateRequestDTO.facebookLink = 'https://facebook.com/janedoe';
    updateRequestDTO.instagramLink = 'https://instagram.com/janedoe';

    const response = await controller.updateTeacherProfile(1, updateRequestDTO);

    expect(response).toEqual({
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      biography: 'This is my biography',
      tiktokLink: 'https://tiktok.com/janedoe',
      twitterLink: 'https://twitter.com/janedoe',
      facebookLink: 'https://facebook.com/janedoe',
      instagramLink: 'https://instagram.com/janedoe',
    });
  });

  it('should throw an error if the teacher service throws an error', async () => {
    const updateRequestDTO = new UpdateTeacherProfileRequestDTO();
    updateRequestDTO.firstName = 'Jane';
    updateRequestDTO.lastName = 'Doe';
    updateRequestDTO.email = 'jane.doe@example.com';
    updateRequestDTO.phone = '1234567890';
    updateRequestDTO.address = '123 Main St';
    updateRequestDTO.city = 'Anytown';
    updateRequestDTO.state = 'CA';
    updateRequestDTO.biography = 'This is my biography';
    updateRequestDTO.tiktokLink = 'https://tiktok.com/janedoe';
    updateRequestDTO.twitterLink = 'https://twitter.com/janedoe';
    updateRequestDTO.facebookLink = 'https://facebook.com/janedoe';
    updateRequestDTO.instagramLink = 'https://instagram.com/janedoe';

    (teacherService.updateTeacherProfile as jest.Mock).mockRejectedValue(new Error('Test error')); // Use the mock function here

    await expect(controller.updateTeacherProfile(1, updateRequestDTO)).rejects.toThrowError('Test error');
  });
});