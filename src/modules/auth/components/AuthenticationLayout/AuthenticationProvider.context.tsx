import React from "react";
import { AuthenticationActions } from "src/modules/auth/components/AuthenticationLayout/state/authenticationAction";

interface AuthenticationContextState {
  authenticationDispatch: React.Dispatch<AuthenticationActions>;
}

const AuthenticationContext = React.createContext(
  {} as AuthenticationContextState
);

export function useAuthenticationState() {
  const context = React.useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthenticationState must be used within an AuthenticationProvider"
    );
  }

  return context;
}

interface AuthenticationProviderProps {
  children: React.ReactNode;
  authenticationDispatch: React.Dispatch<AuthenticationActions>;
}

export function AuthenticationProvider({
  children,
  authenticationDispatch,
}: AuthenticationProviderProps) {
  return (
    <AuthenticationContext.Provider value={{ authenticationDispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
