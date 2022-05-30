import React from "react";

import { MyStore } from "src/modules/shared/store/MyStore";
import { BudgetBalanceStore } from "./BudgetBalanceStore";

export interface BudgetBalanceState
  extends ReturnType<typeof useBudgetBalanceState> {}

export const useBudgetBalanceState = () => {
  const [balance, setBalance] = React.useState(0);

  const budgetBalanceStore: MyStore<BudgetBalanceStore> = React.useCallback(
    () => ({
      updateBalance: (balance: number) => setBalance(balance),
    }),
    []
  );

  return { balance, budgetBalanceStore };
};