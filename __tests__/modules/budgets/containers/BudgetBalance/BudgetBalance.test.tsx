import { render, renderHook, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BudgetBalance } from "src/modules/budgets/containers/BudgetBalance";
import { BudgetsRepository } from "src/modules/budgets/service/BudgetsRepository";
import * as useNodeBudgetsRepository from "src/modules/budgets/service/useNodeBudgets.repository";
import { BudgetBalanceStore } from "src/modules/budgets/store/BudgetBalanceStore";
import * as useBudgetBalanceState from "src/modules/budgets/store/useBalanceState";

const balance = 1000;

const budgetBalanceStore: BudgetBalanceStore = {
  updateBalance: jest.fn(),
};

const budgetsRepository: BudgetsRepository = {
  getBalance: jest.fn().mockResolvedValue(balance),
};

jest
  .spyOn(useNodeBudgetsRepository, "useNodeBudgetsRepository")
  .mockReturnValue(jest.fn().mockReturnValue(budgetsRepository));

jest.spyOn(useBudgetBalanceState, "useBudgetBalanceState").mockReturnValue({
  balance,
  budgetBalanceStore: () => budgetBalanceStore,
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

    expect(budgetsRepository.getBalance).toHaveBeenCalledTimes(1);
    expect(budgetBalanceStore.updateBalance).toHaveBeenCalledTimes(1);
    expect(budgetBalanceStore.updateBalance).toHaveBeenCalledWith(balance);
  });

  test("should match the snapshot", async () => {
    const budgetBalanceState = renderHook(() =>
      useBudgetBalanceState.useBudgetBalanceState()
    );

    const component = renderer
      .create(
        <BudgetBalance
          balance={budgetBalanceState.result.current.balance}
          budgetBalanceStore={
            budgetBalanceState.result.current.budgetBalanceStore
          }
          budgetsRepository={useNodeBudgetsRepository.useNodeBudgetsRepository()}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
