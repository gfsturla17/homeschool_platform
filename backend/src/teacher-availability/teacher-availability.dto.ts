import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TeacherAvailabilityGraphQL {
  @Field()
  id: number;

  @Field()
  startDateTime: Date;

  @Field()
  endDateTime: Date;

  @Field()
  repeatFrequency: string;

  @Field({ nullable: true })
  repeatUntil: Date;
}