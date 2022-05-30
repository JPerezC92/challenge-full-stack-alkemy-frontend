export interface BudgetsRepository {
  getBalance(): Promise<number | undefined>;
}
