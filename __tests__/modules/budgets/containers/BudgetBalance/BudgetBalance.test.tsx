import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BudgetBalance } from "src/modules/budgets/containers/BudgetBalance";
import { BudgetsRepository } from "src/modules/budgets/service/BudgetsRepository";
import { BudgetBalanceStore } from "src/modules/budgets/store/BudgetBalanceStore";
import * as useBudgetBalanceState from "src/modules/budgets/store/useBalanceState";

const balance = (1000).toFixed(2);

const budgetBalanceStore: BudgetBalanceStore = {
  updateBalance: jest.fn(),
};

const budgetsRepository: BudgetsRepository = {
  getBalance: jest.fn().mockResolvedValue(balance),
};

jest
  .spyOn(useBudgetBalanceState, "useBudgetBalanceState")
  .mockImplementation(() => ({
    balance,
    budgetBalanceStore: () => budgetBalanceStore,
  }));

describe("BudgetBalance component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call getBalance and updateBalance", async () => {
    render(<BudgetBalance budgetsRepository={() => budgetsRepository} />);

    await waitFor(async () => {
      expect(await screen.findByText(/1000/i)).toBeInTheDocument();
    });

    expect(budgetsRepository.getBalance).toHaveBeenCalledTimes(1);
    expect(budgetBalanceStore.updateBalance).toHaveBeenCalledTimes(1);
    expect(budgetBalanceStore.updateBalance).toHaveBeenCalledWith(balance);
  });

  test("should match the snapshot", async () => {
    const component = renderer
      .create(<BudgetBalance budgetsRepository={() => budgetsRepository} />)
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
