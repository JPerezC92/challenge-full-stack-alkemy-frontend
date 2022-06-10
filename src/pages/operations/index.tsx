import React from "react";
import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MovementRegisterForm } from "src/modules/movements/containers/MovementRegisterForm";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import {
  MovementEventActionType,
  useMovementEventState,
} from "src/modules/movements/context/MovementEventProvider.context";
import { MovementType } from "src/modules/movements/models/MovementType";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { MainLayout } from "src/modules/shared/components/MainLayout";

export default function OperationsPage(): React.ReactElement {
  const movementsRepository = useNodeMovementsRepository();
  const { movementEventDispatch } = useMovementEventState();
  const [movementType, setMovementType] = React.useState(MovementType.INCOME);

  const setIncome = () => setMovementType(MovementType.INCOME);
  const setExpense = () => setMovementType(MovementType.EXPENSE);

  const handleOnCreate = React.useCallback(
    (movementType: MovementType) => {
      movementEventDispatch({
        type: MovementEventActionType.MOVEMENT_CREATED,
        payload: movementType,
      });
    },
    [movementEventDispatch]
  );

  return (
    <>
      <br />
      <MovementRegisterForm
        movementsRepository={movementsRepository}
        onCreate={handleOnCreate}
      />
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          border: "1px solid black",
        }}
      >
        <button type="button" onClick={setIncome}>
          {MovementType.INCOME}
        </button>
        <button type="button" onClick={setExpense}>
          {MovementType.EXPENSE}
        </button>
      </nav>

      <MovementsCollection
        movementsRepository={movementsRepository}
        movementType={movementType}
      />
    </>
  );
}

OperationsPage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <MainLayout>
        <MovementsLayout>{page}</MovementsLayout>
      </MainLayout>
    </>
  );
};
