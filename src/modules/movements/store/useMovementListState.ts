import React from "react";
import { MyStore } from "src/modules/shared/store/MyStore";
import { MovementEndpoint } from "../dto/MovementEndpoint";
import { MovementListStore } from "./MovementListStore";

export function useMovementListState() {
  const [movementList, setMovementList] = React.useState<MovementEndpoint[]>(
    []
  );

  const movementListStore: MyStore<MovementListStore> = React.useCallback(
    () => ({
      updateMovementList: (movements: MovementEndpoint[]) =>
        setMovementList(movements),
    }),
    []
  );

  return { movementList, movementListStore };
}
