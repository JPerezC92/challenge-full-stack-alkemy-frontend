import React from "react";
import { MovementDomainToView } from "src/modules/movements/adapters/MovementDomainToView";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MovementStore } from "./MovementStore";

export function useMovementState(MovementView?: MovementView) {
  const [movement, setMovement] = React.useState<MovementView | undefined>(
    undefined
  );

  const movementStore = React.useRef<MovementStore>({
    updateMovement: (movement) => setMovement(MovementDomainToView(movement)),
  });

  return { movement, movementStore: movementStore.current };
}
