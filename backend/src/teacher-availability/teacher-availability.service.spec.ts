import { Test, TestingModule } from '@nestjs/testing';
import { TeacherAvailabilityService } from './teacher-availability.service';

describe('TeacherAvailabilityService', () => {
  let service: TeacherAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherAvailabilityService],
    }).compile();

    service = module.get<TeacherAvailabilityService>(TeacherAvailabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
