import React from "react";
import { AuthenticationState } from "src/modules/auth/components/AuthenticationLayout/state/authenticationReducer";
import { Redirect } from "src/modules/shared/components/Redirect";
import { mainRoutes } from "src/modules/shared/routes/web";
import { CredentialsProvider } from "./CredentialsProvider.context";

type PrivateRouteProps = { children: React.ReactNode } & AuthenticationState;

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  user,
  accessToken,
}) => {
  if (!isAuthenticated || !user)
    return <Redirect to={mainRoutes.login} replace />;

  return (
    <>
      <CredentialsProvider user={user} accessToken={accessToken}>
        {children}
      </CredentialsProvider>
    </>
  );
};
