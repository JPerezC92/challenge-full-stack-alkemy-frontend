import { User } from "src/modules/auth/models/User";

export const enum AuthenticationActionType {
  Login = "LOGIN",
  Logout = "LOGOUT",
  Loading = "LOADING",
  LoginError = "LOGIN_ERROR",
}

export type AuthenticationActions =
  | {
      type: AuthenticationActionType.Login;
      payload: { user: User; accessToken: string };
    }
  | {
      type: AuthenticationActionType.Loading;
    }
  | {
      type: AuthenticationActionType.LoginError;
      payload: { errorMessage: string };
    }
  | {
      type: AuthenticationActionType.Logout;
    };
