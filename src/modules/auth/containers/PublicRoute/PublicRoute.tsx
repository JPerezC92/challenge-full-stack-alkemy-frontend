import React from "react";
import { Redirect } from "src/modules/shared/components/Redirect";
import { mainRoutes } from "src/modules/shared/routes/web";
import { AuthenticationState } from "../../components/AuthenticationLayout/state/authenticationReducer";

type PublicRouteProps = { children: React.ReactNode } & Pick<
  AuthenticationState,
  "isAuthenticated"
>;

export const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (isAuthenticated) {
    return <Redirect to={mainRoutes.home} replace />;
  }

  return <>{children}</>;
};
