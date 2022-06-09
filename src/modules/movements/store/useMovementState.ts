import React from "react";
import { MovementDomainToView } from "src/modules/movements/adapters/MovementDomainToView";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MyStore } from "src/modules/shared/store/MyStore";
import { MovementStore } from "./MovementStore";

export function useMovementState(MovementView?: MovementView) {
  const [movement, setMovement] = React.useState<MovementView | undefined>(
    undefined
  );

  const movementStore: MyStore<MovementStore> = React.useCallback(
    () => ({
      updateMovement: (movement) => setMovement(MovementDomainToView(movement)),
    }),
    []
  );

  return { movement, movementStore };
}
