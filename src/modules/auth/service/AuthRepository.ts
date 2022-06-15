import { UserCreate } from "src/modules/auth/dto/UserCreate";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";

export interface AuthRepository {
  register: (userCreate: UserCreate) => Promise<AccessCredentials | void>;
}
