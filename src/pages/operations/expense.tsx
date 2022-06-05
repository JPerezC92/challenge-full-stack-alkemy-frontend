import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import { MovementType } from "src/modules/movements/models/MovementType";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { MainLayout } from "src/modules/shared/components/MainLayout";

export default function ExpensePage() {
  const movementsRepository = useNodeMovementsRepository();
  return (
    <>
      Expense
      <MovementsCollection
        movementsRepository={movementsRepository}
        movementType={MovementType.EXPENSE}
      />
    </>
  );
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
