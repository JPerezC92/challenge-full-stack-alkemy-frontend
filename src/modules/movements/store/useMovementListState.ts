import React from "react";
import { MovementDomainToView } from "src/modules/movements/adapters/MovementDomainToView";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MovementListStore } from "./MovementListStore";

export function useMovementListState() {
  const [movementList, setMovementList] = React.useState<MovementView[]>([]);

  const movementListStore = React.useRef<MovementListStore>({
    updateMovementList: (movementList) =>
      setMovementList(movementList.map(MovementDomainToView)),
  });

  return { movementList, movementListStore: movementListStore.current };
}
