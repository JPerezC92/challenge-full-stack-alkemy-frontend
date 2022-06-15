import React from "react";
import { AuthRegisterPostEndpoint } from "src/modules/auth/dto/AuthRegisterPostEndpoint";
import { UserEndpointToDomain } from "src/modules/auth/mappers/UserEndpointToDomain";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { JsendStatus } from "src/modules/shared/service/JsendResponse";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { AuthRepository } from "./AuthRepository";
import { RefreshTokenCookieRepository } from "./RefreshTokenCookie.repository";

export function useNodeAuthRepository(): MyRepository<AuthRepository> {
  return React.useCallback(({ abortController }) => {
    const authApiUrl = `${BASE_API_URL}/auth`;
    const refreshTokenCookieRepository = RefreshTokenCookieRepository();

    return {
      register: async (createUser): Promise<AccessCredentials | void> => {
        const response = await fetch(`${authApiUrl}/register`, {
          body: JSON.stringify({ ...createUser }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          signal: abortController.signal,
        });

        const result = (await response.json()) as AuthRegisterPostEndpoint;

        if (result.status !== JsendStatus.success) return;

        const { accessToken, refreshToken, user } = result.data;

        refreshTokenCookieRepository.save(refreshToken);

        return {
          user: UserEndpointToDomain(user),
          accessToken: accessToken,
        };
      },
    };
  }, []);
}
