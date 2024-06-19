import { ObjectType, Field, InputType, Int, Directive } from "@nestjs/graphql";
import { IsEmail, IsUrl, MaxLength, MinLength } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { Parent } from "../entities/parent.entity";

@ObjectType()
export class ParentProfileGraphQL {
  @Field(type => Int)
  @AutoMap()
  id: number;

  @Field({ nullable: true })
  @AutoMap()
  address?: string;

  @Field({ nullable: true })
  @AutoMap()
  city?: string;

  @Field({ nullable: true })
  @AutoMap()
  state?: string;

  @Field({ nullable: true })
  @AutoMap()
  biography?: string;

  @Field({ nullable: true })
  @AutoMap()
  profilePictureUrl?: string;
}

@ObjectType()
export class ParentGraphQL {
  @Field(type => Int)
  @AutoMap()
  id: number;

  @Field()
  @AutoMap()
  firstName: string;

  @Field()
  @AutoMap()
  lastName: string;

  @Field(type => Int)
  @AutoMap()
  userId: number;

  @Field(type => ParentProfileGraphQL, { nullable: true })
  @AutoMap()
  profile?: ParentProfileGraphQL;
}

@InputType()
export class CreateParentInput {
  @Field()
  @MaxLength(50)
  @MinLength(2)
  firstName: string;

  @Field()
  @MaxLength(50)
  @MinLength(2)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
export class UpdateParentProfileInput {
  @Field({ nullable: true })
  @MaxLength(100)
  address?: string;

  @Field({ nullable: true })
  @MaxLength(50)
  city?: string;

  @Field({ nullable: true })
  @MaxLength(2)
  state?: string;

  @Field({ nullable: true })
  @MaxLength(200)
  biography?: string;

  @Field({ nullable: true })
  @IsUrl()
  profilePictureUrl?: string;
}
