import React from "react";
import { AuthenticationProvider } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useLoading } from "src/modules/shared/hooks/useLoading";
import { isDefined } from "src/modules/shared/utils/isDefined";
import { AuthenticationActionType } from "./state/authenticationAction";
import {
  authenticationInitialState,
  authenticationReducer,
  AuthenticationState,
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
  const { isLoading, startLoading, finishLoading } = useLoading(true);

  const [verifyRefreshToken] = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      const accessCredentials = await _authRepository.refreshToken();

      return async () => {
        startLoading();
        if (
          !accessCredentials ||
          !isDefined(accessCredentials.user) ||
          !isDefined(accessCredentials.accessToken)
        ) {
          return finishLoading();
        }

        authenticationDispatch({
          type: AuthenticationActionType.Login,
          payload: { ...accessCredentials },
        });
        finishLoading();
      };
    },
    [authRepository, finishLoading, startLoading]
  );

  React.useEffect(() => {
    window.addEventListener("load", verifyRefreshToken);

    return () => window.removeEventListener("load", verifyRefreshToken);
  }, [verifyRefreshToken]);

  if (isLoading) {
    return (
      <>
        <>...Verifiying access credentials</>
      </>
    );
  }

  return (
    <AuthenticationProvider authenticationDispatch={authenticationDispatch}>
      <Route {...state}>{children}</Route>
    </AuthenticationProvider>
  );
}
