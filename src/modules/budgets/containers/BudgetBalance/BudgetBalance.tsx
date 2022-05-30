import React from "react";
import { BudgetsRepository } from "src/modules/budgets/service/BudgetsRepository";
import { BudgetBalanceStore } from "src/modules/budgets/store/BudgetBalanceStore";
import { useRequest } from "src/modules/shared/hooks/useRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { MyStore } from "src/modules/shared/store/MyStore";

type BudgetBalanceProps = {
  balance: number;
  budgetsRepository: MyRepository<BudgetsRepository>;
  budgetBalanceStore: MyStore<BudgetBalanceStore>;
};

export const BudgetBalance: React.FC<BudgetBalanceProps> = ({
  balance,
  budgetBalanceStore,
  budgetsRepository,
}) => {
  useRequest(
    async ({ abortController }) => {
      const _budgetsRepository = budgetsRepository({ abortController });
      const _budgetBalanceStore = budgetBalanceStore();
      const balance = await _budgetsRepository.getBalance();

      if (!balance) return;

      _budgetBalanceStore.updateBalance(balance);
    },

    [budgetBalanceStore, budgetsRepository]
  );

  return (
    <>
      <h1>Current balance: {balance}</h1>
    </>
  );
};
