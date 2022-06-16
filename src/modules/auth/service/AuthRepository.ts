import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { UserLogin } from "../dto/UserLogin";

export interface AuthRepository {
  register: (userCreate: UserRegister) => Promise<AccessCredentials | void>;
  login: (userLogin: UserLogin) => Promise<AccessCredentials | void>;
}
