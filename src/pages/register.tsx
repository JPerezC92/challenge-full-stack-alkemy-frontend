import Link from "next/link";
import React from "react";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { useAuthenticationState } from "src/modules/auth/components/AuthenticationLayout/AuthenticationProvider.context";
import { AuthenticationActionType } from "src/modules/auth/components/AuthenticationLayout/state/authenticationAction";
import { AuthRegisterForm } from "src/modules/auth/containers/AuthRegisterForm";
import { PublicRoute } from "src/modules/auth/containers/PublicRoute";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { useNodeAuthRepository } from "src/modules/auth/service/useNodeAuth.repository";
import { mainRoutes } from "src/modules/shared/routes/web";

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
    <main className="m-auto flex min-h-screen max-w-md flex-col justify-center px-2">
      <AuthRegisterForm
        authRepository={authRepository}
        onSuccess={onRegisterSuccess}
      />

      <hr className="my-4" />

      <Link href={mainRoutes.login}>
        <a className="rounded border border-orange-500/50 p-2 text-center font-bold hover:bg-orange-500/5">
          Login
        </a>
      </Link>
    </main>
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
