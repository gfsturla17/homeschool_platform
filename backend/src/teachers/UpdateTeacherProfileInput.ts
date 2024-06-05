import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TeacherProfileGraphQL {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  biography: string;

  @Field()
  tiktokLink: string;

  @Field()
  twitterLink: string;

  @Field()
  facebookLink: string;

  @Field()
  instagramLink: string;
}

@InputType()
export class UpdateTeacherProfileInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  biography: string;

  @Field()
  tiktokLink: string;

  @Field()
  twitterLink: string;

  @Field()
  facebookLink: string;

  @Field()
  instagramLink: string;
}