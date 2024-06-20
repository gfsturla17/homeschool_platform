import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginRequestGraphQL {
  @Field()
  email: string;

  @Field()
  password: string;
}