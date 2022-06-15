import { UserEndpoint } from "src/modules/auth/dto/UserEndpoint";
import { User } from "src/modules/auth/models/User";

export function UserEndpointToDomain(userEndpoint: UserEndpoint): User {
  return new User({
    id: userEndpoint.id,
    firstName: userEndpoint.firstName,
    email: userEndpoint.email,
    lastName: userEndpoint.lastName,
  });
}
