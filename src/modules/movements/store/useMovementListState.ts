import React from "react";
import { MovementDomainToView } from "src/modules/movements/adapters/MovementDomainToView";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MyStore } from "src/modules/shared/store/MyStore";
import { MovementListStore } from "./MovementListStore";

export function useMovementListState() {
  const [movementList, setMovementList] = React.useState<MovementView[]>([]);

  const movementListStore: MyStore<MovementListStore> = React.useCallback(
    () => ({
      updateMovementList: (movementList) =>
        setMovementList(movementList.map(MovementDomainToView)),
    }),
    []
  );

  return { movementList, movementListStore };
}
