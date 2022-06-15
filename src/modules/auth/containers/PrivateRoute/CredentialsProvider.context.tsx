import React from "react";
import { UserEndpoint } from "src/modules/auth/dto/UserEndpoint";
import { AuthenticationState } from "../../components/AuthenticationLayout/state/authenticationReducer";

interface CredentialsContextState
  extends Required<Pick<AuthenticationState, "user" | "accessToken">> {}

const CredentialsContext = React.createContext({} as CredentialsContextState);

export function useCredentialsState() {
  const context = React.useContext(CredentialsContext);

  if (!context) {
    throw new Error(
      "useCredentialsState must be used within an CredentialsProvider"
    );
  }

  return context;
}

interface CredentialsProviderProps extends CredentialsContextState {
  children: React.ReactNode;
}

export function CredentialsProvider({
  children,
  user,
  accessToken,
}: CredentialsProviderProps) {
  return (
    <CredentialsContext.Provider value={{ user, accessToken }}>
      {children}
    </CredentialsContext.Provider>
  );
}
