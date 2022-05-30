import React from "react";
import { BalanceEndpoint } from "src/modules/budgets/dto/BalanceEndpoint";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { BudgetsRepository } from "./BudgetsRepository";

export function useNodeBudgetsRepository(): MyRepository<BudgetsRepository> {
  return React.useCallback(({ abortController }) => {
    const budgetsApiUrl = `${BASE_API_URL}/budgets`;

    return {
      getBalance: async (): Promise<number | undefined> => {
        const response = await fetch(`${budgetsApiUrl}/balance`, {
          signal: abortController.signal,
          method: "GET",
        });

        const balanceEndpoint = (await response.json()) as BalanceEndpoint;

        return balanceEndpoint.data.balance;
      },
    };
  }, []);
}
