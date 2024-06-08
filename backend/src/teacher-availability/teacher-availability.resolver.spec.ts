import { Test, TestingModule } from '@nestjs/testing';
import { TeacherAvailabilityResolver } from './teacher-availability.resolver';

describe('TeacherAvailabilityResolver', () => {
  let resolver: TeacherAvailabilityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherAvailabilityResolver],
    }).compile();

    resolver = module.get<TeacherAvailabilityResolver>(TeacherAvailabilityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
