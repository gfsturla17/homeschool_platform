import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponseGraphQL } from "./dto/login-response.graphql";
import { LoginRequestGraphQL } from "./dto/login-request.graphql";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => LoginResponseGraphQL)
  async login(@Args('data') loginRequestGraphQL: LoginRequestGraphQL): Promise<LoginResponseGraphQL> {
    return this.authService.loginGraphQL(loginRequestGraphQL);
  }

}
