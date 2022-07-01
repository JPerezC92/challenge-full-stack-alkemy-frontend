import { UserLogin } from "src/modules/auth/dto/UserLogin";
import { UserRegister } from "src/modules/auth/dto/UserRegister";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";

export interface AuthRepository {
  register: (userCreate: UserRegister) => Promise<AccessCredentials | void>;
  login: (userLogin: UserLogin) => Promise<AccessCredentials | void>;
  logout: (
    props: Pick<AccessCredentials, "accessToken">
  ) => Promise<boolean | void>;
  refreshToken: () => Promise<AccessCredentials | void>;
}
