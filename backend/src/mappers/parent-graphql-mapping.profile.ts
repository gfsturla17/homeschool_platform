import { createMap, mapFrom, Mapper, MappingProfile, forMember, mapWith, afterMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Parent } from "../entities/parent.entity";
import { ParentGraphQL, ParentProfileGraphQL } from "../parents/parents.graphql";
import { ParentProfile } from "../entities/parentprofile.entity";

export class ParentGraphqlMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {

      // Mapping ParentProfile to ParentProfileGraphQL
      createMap(mapper, ParentProfile, ParentProfileGraphQL,
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.address,
          mapFrom((parentProfile) => parentProfile.parent.user.address.address)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.city,
          mapFrom((parentProfile) => parentProfile.parent.user.address.city)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.state,
          mapFrom((parentProfile) => parentProfile.parent.user.address.state)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.id,
          mapFrom((parentProfile) => parentProfile.id)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.biography,
          mapFrom((parentProfile) => parentProfile.biography)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.profilePictureUrl,
          mapFrom((parentProfile) => parentProfile.profilePictureUrl)
        )
      );

      // Mapping Parent to ParentGraphQL
      createMap(mapper, Parent, ParentGraphQL,
        forMember(
          (parentGraphQL) => parentGraphQL.profile,
          mapWith(
            ParentProfileGraphQL,
            ParentProfile,
            (parent) => parent.profile
          )
        ),
        afterMap((source, destination) => {
          // Custom logic after mapping
          if (destination.profile) {
            destination.profile.id = source.user.id;
          }
        })
      );
    };
  }
}
