import { User } from "src/modules/auth/models/User";
import {
  AuthenticationActions,
  AuthenticationActionType,
} from "./authenticationAction";

export interface AuthenticationState {
  isAuthenticated: boolean;
  user?: User;
  accessToken: string;
}

export const authenticationInitialState: AuthenticationState = {
  isAuthenticated: false,
  user: undefined,
  accessToken: "",
};

export function authenticationReducer(
  state: AuthenticationState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionType.Login:
      return { ...state, ...action.payload, isAuthenticated: true };

    case AuthenticationActionType.Logout:
      return { accessToken: "", isAuthenticated: false, user: undefined };

    default:
      return state;
  }
}
