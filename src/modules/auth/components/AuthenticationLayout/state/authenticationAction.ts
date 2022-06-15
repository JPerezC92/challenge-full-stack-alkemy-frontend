import { User } from "src/modules/auth/models/User";

export const enum AuthenticationActionType {
  Login = "LOGIN",
  Logout = "LOGOUT",
}

export type AuthenticationActions =
  | {
      type: AuthenticationActionType.Login;
      payload: { user: User; accessToken: string };
    }
  | {
      type: AuthenticationActionType.Logout;
    };
