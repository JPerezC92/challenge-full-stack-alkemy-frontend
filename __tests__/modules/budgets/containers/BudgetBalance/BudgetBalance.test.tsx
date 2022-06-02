import { render, renderHook, waitFor } from "@testing-library/react";

import { BudgetBalance } from "src/modules/budgets/containers/BudgetBalance";
import * as useNodeBudgetsRepository from "src/modules/budgets/service/useNodeBudgets.repository";
import * as useBudgetBalanceState from "src/modules/budgets/store/useBalanceState";

const balance = 1000;
const defaultBalance = 100;

const getBalance = jest.fn().mockResolvedValue(balance);
const updateBalance = jest.fn();

jest
  .spyOn(useNodeBudgetsRepository, "useNodeBudgetsRepository")
  .mockReturnValue(jest.fn().mockReturnValue({ getBalance }));

jest.spyOn(useBudgetBalanceState, "useBudgetBalanceState").mockReturnValueOnce({
  balance: defaultBalance,
  budgetBalanceStore: () => ({ updateBalance }),
});

describe("BudgetBalance component", () => {
  test("should call getBalance and updateBalance", async () => {
    const budgetBalanceState = renderHook(() =>
      useBudgetBalanceState.useBudgetBalanceState()
    );

    const component = render(
      <BudgetBalance
        balance={budgetBalanceState.result.current.balance}
        budgetBalanceStore={
          budgetBalanceState.result.current.budgetBalanceStore
        }
        budgetsRepository={useNodeBudgetsRepository.useNodeBudgetsRepository()}
      />
    );

    await waitFor(async () => {
      expect(await component.findByText(/100/i)).toBeInTheDocument();
    });

    expect(getBalance).toHaveBeenCalledTimes(1);
    expect(updateBalance).toHaveBeenCalledTimes(1);
  });

  test("should match the snapshot", async () => {
    const budgetBalanceState = renderHook(() =>
      useBudgetBalanceState.useBudgetBalanceState()
    );

    const component = render(
      <BudgetBalance
        balance={budgetBalanceState.result.current.balance}
        budgetBalanceStore={
          budgetBalanceState.result.current.budgetBalanceStore
        }
        budgetsRepository={useNodeBudgetsRepository.useNodeBudgetsRepository()}
      />
    );

    await waitFor(() =>
      expect(budgetBalanceState.result.current.balance).toBe(balance)
    );

    component.rerender(
      <BudgetBalance
        balance={budgetBalanceState.result.current.balance}
        budgetBalanceStore={
          budgetBalanceState.result.current.budgetBalanceStore
        }
        budgetsRepository={useNodeBudgetsRepository.useNodeBudgetsRepository()}
      />
    );

    expect(component.container).toMatchSnapshot();
  });
});
