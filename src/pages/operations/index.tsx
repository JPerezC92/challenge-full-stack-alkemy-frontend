import React from "react";
import { AuthenticationLayout } from "src/modules/auth/components/AuthenticationLayout";
import { PrivateRoute } from "src/modules/auth/containers/PrivateRoute";
import { MovementsLayout } from "src/modules/movements/components/MovementsLayout";
import { MovementsSection } from "src/modules/movements/components/MovementsSection";
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
    <main className="relative grid grid-cols-12 gap-4">
      <MovementRegisterForm
        className="col-span-12 h-min md:sticky md:top-4 md:col-span-4 md:col-start-9"
        movementsRepository={movementsRepository}
        onCreate={handleOnCreate}
      />

      <MovementsSection
        className="col-span-12 md:col-span-8 md:col-start-1 md:row-start-1"
        movementsRepository={movementsRepository}
      />
    </main>
  );
}

OperationsPage.getLayout = function (page: React.ReactElement) {
  return (
    <>
      <AuthenticationLayout Route={PrivateRoute}>
        <MainLayout>
          <MovementsLayout>{page}</MovementsLayout>
        </MainLayout>
      </AuthenticationLayout>
    </>
  );
};
