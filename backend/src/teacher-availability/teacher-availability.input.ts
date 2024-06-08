import { IsDate, IsEnum, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { Transform } from 'class-transformer';

enum RepeatFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

@InputType()
export class TeacherAvailabilityInput {
  @IsDate()
  @Field()
  startDateTime: Date;

  @IsDate()
  @Field()
  endDateTime: Date;

  @IsEnum(RepeatFrequency)
  @Field()
  repeatFrequency: RepeatFrequency;
}
