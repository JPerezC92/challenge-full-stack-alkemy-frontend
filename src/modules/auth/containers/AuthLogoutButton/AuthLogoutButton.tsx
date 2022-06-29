import React from "react";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { AuthRepository } from "src/modules/auth/service/AuthRepository";
import { Button } from "src/modules/shared/components/Button";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useLoading } from "src/modules/shared/hooks/useLoading";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type AuthLogoutButtonProps = {
  children?: React.ReactNode;
  authRepository: MyRepository<AuthRepository>;
  accessToken: AccessCredentials["accessToken"];
  onClick?: () => void;
};

export const AuthLogoutButton: React.FC<AuthLogoutButtonProps> = ({
  children,
  authRepository,
  accessToken,
  onClick,
}) => {
  const { isLoading, startLoading, finishLoading } = useLoading();
  const [handleLogout] = useCallableRequest(
    async ({ abortController }) => {
      const _authRepository = authRepository({ abortController });

      return async () => {
        try {
          startLoading();
          const success = await _authRepository.logout({ accessToken });

          if (!success) return;

          onClick?.();
        } finally {
          finishLoading();
        }
      };
    },
    [accessToken, authRepository, finishLoading, onClick, startLoading]
  );

  return (
    <Button
      type="button"
      tertiary
      outline
      onClick={handleLogout}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};
