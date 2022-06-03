import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MainLayout } from "src/modules/shared/components/MainLayout";

export default function ExpensePage() {
  return <>Expense</>;
}

ExpensePage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <MainLayout>
        <MovementsLayout>{page}</MovementsLayout>
      </MainLayout>
    </>
  );
};
