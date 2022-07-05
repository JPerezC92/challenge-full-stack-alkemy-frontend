import { User } from "src/modules/auth/models/User";
import {
  AuthenticationActions,
  AuthenticationActionType,
} from "./authenticationAction";

export interface AuthenticationState {
  isAuthenticated: boolean;
  user?: User;
  accessToken: string;
  errorMessage: string;
  isLoading: IsLoadingEnum;
}

export enum IsLoadingEnum {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export const authenticationInitialState: AuthenticationState = {
  isAuthenticated: false,
  user: undefined,
  accessToken: "",
  errorMessage: "",
  isLoading: IsLoadingEnum.IDLE,
};

export function authenticationReducer(
  state: AuthenticationState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionType.Login:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: IsLoadingEnum.SUCCEEDED,
      };

    case AuthenticationActionType.Loading:
      return { ...state, isLoading: IsLoadingEnum.LOADING, errorMessage: "" };

    case AuthenticationActionType.LoginError:
      return { ...state, ...action.payload, isLoading: IsLoadingEnum.FAILED };

    case AuthenticationActionType.Logout:
      return {
        errorMessage: "",
        accessToken: "",
        isAuthenticated: false,
        user: undefined,
        isLoading: IsLoadingEnum.SUCCEEDED,
      };

    default:
      return state;
  }
}
