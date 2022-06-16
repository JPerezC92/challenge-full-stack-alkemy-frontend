import Link from "next/link";
import React from "react";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { useAuthenticationState } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { AuthenticationActionType } from "src/modules/auth/components/AuthenticationLayout/state/authenticationAction";
import { AuthLoginForm } from "src/modules/auth/containers/AuthLoginForm";
import { PublicRoute } from "src/modules/auth/containers/PublicRoute";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { mainRoutes } from "src/modules/shared/routes/web";

export default function LoginPage(): React.ReactElement {
  const authRepository = useNodeAuthRepository();
  const { authenticationDispatch } = useAuthenticationState();

  const handleOnSuccess = React.useCallback(
    (accessCredentials: AccessCredentials) => {
      authenticationDispatch({
        type: AuthenticationActionType.Login,
        payload: { ...accessCredentials },
      });
    },
    [authenticationDispatch]
  );

  return (
    <>
      <AuthLoginForm
        authRepository={authRepository}
        onSuccess={handleOnSuccess}
      />

      <Link href={mainRoutes.register}>
        <a>Register</a>
      </Link>
    </>
  );
}

LoginPage.getLayout = function (page: React.ReactElement): React.ReactElement {
  return (
    <>
      <AuthenticationLayout Route={PublicRoute}>{page}</AuthenticationLayout>
    </>
  );
};
