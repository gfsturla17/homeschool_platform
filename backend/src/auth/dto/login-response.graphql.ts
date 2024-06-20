import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponseGraphQL {
  @Field()
  token: string;

  @Field()
  userId: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}