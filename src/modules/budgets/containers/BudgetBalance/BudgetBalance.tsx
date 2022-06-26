import React from "react";
import { BudgetsRepository } from "src/modules/budgets/service/BudgetsRepository";
import { useBudgetBalanceState } from "src/modules/budgets/store/useBalanceState";
import { useRequest } from "src/modules/shared/hooks/useRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type BudgetBalanceProps = {
  budgetsRepository: MyRepository<BudgetsRepository>;
};

export const BudgetBalance: React.FC<BudgetBalanceProps> = ({
  budgetsRepository,
}) => {
  const { balance, budgetBalanceStore } = useBudgetBalanceState();

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
      <h1 className="text-right text-lg font-medium italic">
        Current balance: <b>${balance}</b>
      </h1>
    </>
  );
};
