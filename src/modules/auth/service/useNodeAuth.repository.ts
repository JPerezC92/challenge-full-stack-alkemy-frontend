import React from "react";
import { AuthLoginPostEndpoint } from "src/modules/auth/dto/AuthLoginPostEndpoint";
import { AuthRefreshTokenGetEndpoint } from "src/modules/auth/dto/AuthRefreshTokenGetEndpoint";
import { AuthRegisterPostEndpoint } from "src/modules/auth/dto/AuthRegisterPostEndpoint";
import { UserEndpointToDomain } from "src/modules/auth/mappers/UserEndpointToDomain";
import { AccessCredentials } from "src/modules/auth/models/AccessCredentials";
import { JsendStatus } from "src/modules/shared/service/JsendResponse";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { RequestMethod } from "src/modules/shared/service/RequestMethod";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { formatBearerToken } from "src/modules/shared/utils/formatBearerToken";
import { AuthLogoutTokenGetEndpoint } from "../dto/AuthLogoutTokenGetEndpoint";
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
          method: RequestMethod.POST,
          signal: abortController.signal,
        });

        const result = (await response.json()) as AuthRegisterPostEndpoint;

        if (result.status !== JsendStatus.success) return;

        const { accessToken, refreshToken, user } = result.data;

        refreshTokenCookieRepository.save(refreshToken);

        return { user: UserEndpointToDomain(user), accessToken: accessToken };
      },

      login: async (userLogin): Promise<AccessCredentials | void> => {
        const response = await fetch(`${authApiUrl}/login`, {
          body: JSON.stringify({ ...userLogin }),
          headers: { "Content-Type": "application/json" },
          method: RequestMethod.POST,
          signal: abortController.signal,
        });

        const result = (await response.json()) as AuthLoginPostEndpoint;

        if (result.status !== JsendStatus.success) return;

        const { accessToken, refreshToken, user } = result.data;

        refreshTokenCookieRepository.save(refreshToken);

        return { accessToken, user: UserEndpointToDomain(user) };
      },

      logout: async ({ accessToken }) => {
        const response = await fetch(`${authApiUrl}/logout`, {
          headers: { Authorization: formatBearerToken(accessToken) },
          signal: abortController.signal,
          method: RequestMethod.GET,
        });

        const result = (await response.json()) as AuthLogoutTokenGetEndpoint;

        if (result.status !== JsendStatus.success) return;

        refreshTokenCookieRepository.remove();

        return true;
      },

      refreshToken: async (): Promise<AccessCredentials | void> => {
        const response = await fetch(`${authApiUrl}/refresh-token`, {
          headers: {
            "Content-Type": "application/json",
            "x-refresh-token": formatBearerToken(
              refreshTokenCookieRepository.get()
            ),
          },
          method: RequestMethod.GET,
          signal: abortController.signal,
        });

        const result = (await response.json()) as AuthRefreshTokenGetEndpoint;

        if (result.status !== JsendStatus.success) return;

        const { accessToken, refreshToken, user } = result.data;

        refreshTokenCookieRepository.save(refreshToken);

        return { accessToken, user: UserEndpointToDomain(user) };
      },
    };
  }, []);
}
