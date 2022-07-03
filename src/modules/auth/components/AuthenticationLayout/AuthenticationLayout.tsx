import React from "react";
import { AuthenticationProvider } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { SpinnerFullScreen } from "src/modules/shared/components/SpinnerFullScreen";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useLoading } from "src/modules/shared/hooks/useLoading";
import { isDefined } from "src/modules/shared/utils/isDefined";
import { useIsMounted } from "../../../shared/hooks/useIsMounted";
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
  const isMounted = useIsMounted();
  const authRepository = useNodeAuthRepository();
  const [state, authenticationDispatch] = React.useReducer(
    authenticationReducer,
    authenticationInitialState
  );
  const { isLoading, startLoading, finishLoading } = useLoading(true);

  const [verifyRefreshToken] = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      return async () => {
        try {
          startLoading();
          const accessCredentials = await _authRepository.refreshToken();

          if (
            !accessCredentials ||
            !isDefined(accessCredentials.user) ||
            !isDefined(accessCredentials.accessToken)
          ) {
            return;
          }

          authenticationDispatch({
            type: AuthenticationActionType.Login,
            payload: { ...accessCredentials },
          });
        } finally {
          finishLoading();
        }
      };
    },
    [authRepository, finishLoading, startLoading]
  );

  React.useEffect(() => {
    if (isMounted()) verifyRefreshToken();
  }, [isMounted, verifyRefreshToken]);

  if (isLoading) {
    return <SpinnerFullScreen message="...Verifiying access credentials" />;
  }

  return (
    <AuthenticationProvider authenticationDispatch={authenticationDispatch}>
      <Route {...state}>{children}</Route>
    </AuthenticationProvider>
  );
}
