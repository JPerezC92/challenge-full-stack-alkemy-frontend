import React from "react";
import { AuthenticationProvider } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
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
  const [state, authenticationDispatch] = React.useReducer(
    authenticationReducer,
    authenticationInitialState
  );

  return (
    <AuthenticationProvider authenticationDispatch={authenticationDispatch}>
      <Route {...state}>{children}</Route>
    </AuthenticationProvider>
  );
}
