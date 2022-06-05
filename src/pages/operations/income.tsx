import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import { MovementType } from "src/modules/movements/models/MovementType";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { MainLayout } from "src/modules/shared/components/MainLayout";

export default function IncomePage() {
  const movementsRepository = useNodeMovementsRepository();

  return (
    <>
      Income
      <MovementsCollection
        movementsRepository={movementsRepository}
        movementType={MovementType.INCOME}
      />
    </>
  );
}

IncomePage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <MainLayout>
        <MovementsLayout>{page}</MovementsLayout>
      </MainLayout>
    </>
  );
};
