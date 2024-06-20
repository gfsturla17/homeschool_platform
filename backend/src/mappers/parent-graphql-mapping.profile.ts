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
          (parentProfileGraphQL) => parentProfileGraphQL.parentProfileId,
          mapFrom((parentProfile) => parentProfile.parentProfileId)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.biography,
          mapFrom((parentProfile) => parentProfile.biography)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.profilePictureUrl,
          mapFrom((parentProfile) => parentProfile.profilePictureUrl)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.address,
          mapFrom((parentProfile) => parentProfile.parent.user.address ? parentProfile.parent.user.address.address : null)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.city,
          mapFrom((parentProfile) => parentProfile.parent.user.address ? parentProfile.parent.user.address.city : null)
        ),
        forMember(
          (parentProfileGraphQL) => parentProfileGraphQL.state,
          mapFrom((parentProfile) => parentProfile.parent.user.address ? parentProfile.parent.user.address.state : null)
        )
      );

      // Mapping Parent to ParentGraphQL
      createMap(mapper, Parent, ParentGraphQL,
        forMember(
          (ParentGraphQL) => ParentGraphQL.userId,
          mapFrom((Parent) => Parent.user.id)
        ),
        forMember(
          (ParentGraphQL) => ParentGraphQL.firstName,
          mapFrom((Parent) => Parent.user.firstName)
        ),
        forMember(
          (ParentGraphQL) => ParentGraphQL.lastName,
          mapFrom((Parent) => Parent.user.lastName)
        ),
        forMember(
          (parentGraphQL) => parentGraphQL.profile,
          mapWith(
            ParentProfileGraphQL,
            ParentProfile,
            (parent) => parent.profile
          )
        )
      );
    };
  }
}
