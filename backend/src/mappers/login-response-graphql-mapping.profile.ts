import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { User } from "../entities/user.entity";
import { LoginResponseGraphQL } from "../auth/dto/login-response.graphql";

export class LoginResponseGraphQLMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, User, LoginResponseGraphQL,
        // forMember(
        //   (loginResponseGraphQL) => loginResponseGraphQL.token,
        //   mapFrom((user) => user.token) // You need to add a token property to the User entity
        // ),
        // forMember(
        //   (loginResponseGraphQL) => loginResponseGraphQL.userId,
        //   mapFrom((user) => user.id)
        // ),
        // forMember(
        //   (loginResponseGraphQL) => loginResponseGraphQL.firstName,
        //   mapFrom((user) => user.parent.firstName) // Assuming the User entity has a parent property
        // ),
        // forMember(
        //   (loginResponseGraphQL) => loginResponseGraphQL.lastName,
        //   mapFrom((user) => user.parent.lastName) // Assuming the User entity has a parent property
        // )
      );
    };
  }
}