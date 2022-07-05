import React from "react";
import { toast } from "react-toastify";
import { AuthenticationProvider } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { SpinnerFullScreen } from "src/modules/shared/components/SpinnerFullScreen";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { isAbortError } from "src/modules/shared/utils/asserts/isAbortError";
import { isDefined } from "src/modules/shared/utils/asserts/isDefined";
import { AuthenticationActionType } from "./state/authenticationAction";
import {
  authenticationInitialState,
  authenticationReducer,
  AuthenticationState,
  IsLoadingEnum,
} from "./state/authenticationReducer";

export interface AuthRouteProps extends AuthenticationState {
  children: React.ReactNode;
}

type AuthenticationLayoutProps = {
  children: React.ReactNode;
  Route: React.FC<AuthRouteProps>;
};

export function AuthenticationLayout({
  children,
  Route,
}: AuthenticationLayoutProps) {
  const authRepository = useNodeAuthRepository();
  const [state, authenticationDispatch] = React.useReducer(
    authenticationReducer,
    authenticationInitialState
  );

  const [verifyRefreshToken] = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      return async () => {
        try {
          authenticationDispatch({ type: AuthenticationActionType.Loading });
          const accessCredentials = await _authRepository.refreshToken();

          if (
            !accessCredentials ||
            !isDefined(accessCredentials.user) ||
            !isDefined(accessCredentials.accessToken)
          ) {
            return authenticationDispatch({
              type: AuthenticationActionType.Logout,
            });
          }

          authenticationDispatch({
            type: AuthenticationActionType.Login,
            payload: { ...accessCredentials },
          });
        } catch (error) {
          if (isAbortError(error)) return;

          authenticationDispatch({
            type: AuthenticationActionType.LoginError,
            payload: { errorMessage: "There was an error logging in" },
          });
        }
      };
    },
    [authRepository]
  );

  React.useEffect(() => {
    verifyRefreshToken();
  }, [verifyRefreshToken]);

  React.useEffect(() => {
    if (state.errorMessage) toast.error(state.errorMessage);
  }, [state.errorMessage]);

  if (state.isLoading !== IsLoadingEnum.SUCCEEDED) {
    return <SpinnerFullScreen message="...Verifiying access credentials" />;
  }

  return (
    <AuthenticationProvider authenticationDispatch={authenticationDispatch}>
      <Route {...state}>{children}</Route>
    </AuthenticationProvider>
  );
}
