import Head from "next/head";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { PrivateRoute } from "src/modules/auth/containers/PrivateRoute";
import { BudgetBalance } from "src/modules/budgets/containers/BudgetBalance";
import { useNodeBudgetsRepository } from "src/modules/budgets/service/useNodeBudgets.repository";
import { MovementsMostRecents } from "src/modules/movements/containers/MovementsMostRecents";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { MainLayout } from "src/modules/shared/components/MainLayout";
import { APP_NAME } from "src/modules/shared/utils/constants";

export default function HomePage() {
  const budgetsRepository = useNodeBudgetsRepository();
  const movementsRepository = useNodeMovementsRepository();

  return (
    <>
      <Head>
        <title>{APP_NAME}: Home </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-4">
        <BudgetBalance budgetsRepository={budgetsRepository} />

        <MovementsMostRecents movementsRepository={movementsRepository} />
      </main>
    </>
  );
}

HomePage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <AuthenticationLayout Route={PrivateRoute}>
        <MainLayout>{page}</MainLayout>
      </AuthenticationLayout>
    </>
  );
};
