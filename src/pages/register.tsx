import React from "react";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { useAuthenticationState } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { AuthenticationActionType } from "src/modules/auth/components/AuthenticationLayout/state/authenticationAction";
import { AuthRegisterForm } from "src/modules/auth/containers/AuthRegisterForm";
import { PublicRoute } from "src/modules/auth/containers/PublicRoute";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";

export default function RegisterPage(): React.ReactElement {
  const { authenticationDispatch } = useAuthenticationState();

  const authRepository = useNodeAuthRepository();

  const onRegisterSuccess = React.useCallback(
    (accessCredentials: AccessCredentials): void => {
      authenticationDispatch({
        type: AuthenticationActionType.Login,
        payload: { ...accessCredentials },
      });
    },
    [authenticationDispatch]
  );

  return (
    <>
      <h1>Register</h1>

      <AuthRegisterForm
        authRepository={authRepository}
        onSuccess={onRegisterSuccess}
      />
    </>
  );
}

RegisterPage.getLayout = function (
  page: React.ReactElement
): React.ReactElement {
  return (
    <>
      <AuthenticationLayout Route={PublicRoute}>{page}</AuthenticationLayout>
    </>
  );
};
