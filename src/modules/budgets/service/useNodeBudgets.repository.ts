import React from "react";
import { useCredentialsState } from "src/modules/auth/containers/PrivateRoute/CredentialsProvider.context";
import { BalanceEndpoint } from "src/modules/budgets/dto/BalanceEndpoint";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { formatBearerToken } from "src/modules/shared/utils/formatBearerToken";
import { BudgetsRepository } from "./BudgetsRepository";

export function useNodeBudgetsRepository(): MyRepository<BudgetsRepository> {
  const { accessToken } = useCredentialsState();

  return React.useCallback(
    ({ abortController }) => {
      const budgetsApiUrl = `${BASE_API_URL}/budgets`;

      return {
        getBalance: async (): Promise<number | undefined> => {
          const response = await fetch(`${budgetsApiUrl}/balance`, {
            signal: abortController.signal,
            method: "GET",
            headers: { Authorization: formatBearerToken(accessToken) },
          });

          const balanceEndpoint = (await response.json()) as BalanceEndpoint;

          return balanceEndpoint.data.balance;
        },
      };
    },
    [accessToken]
  );
}
