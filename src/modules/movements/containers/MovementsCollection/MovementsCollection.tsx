import React from "react";
import { MovementCard } from "src/modules/movements/components/MovementCard";
import {
  MovementEventActionType,
  useMovementEventState,
} from "src/modules/movements/context/MovementEventProvider.context";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useMovementListState } from "src/modules/movements/store/useMovementListState";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { OrderType } from "src/modules/shared/models/OrderType";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementsCollectionProps = {
  movementsRepository: MyRepository<MovementsRepository>;
  movementType: MovementType;
};

export const MovementsCollection: React.FC<MovementsCollectionProps> = ({
  movementsRepository,
  movementType,
}) => {
  const { state, movementEventDispatch } = useMovementEventState();
  const { movementList, movementListStore } = useMovementListState();

  const { execute } = useCallableRequest(async ({ abortController }) => {
    const _movementsRepository = movementsRepository({ abortController });
    const _movementListStore = movementListStore();
    return async () => {
      const movementList = await _movementsRepository.query({
        movementType,
        order: OrderType.DESC,
      });

      _movementListStore.updateMovementList(movementList);
    };
  }, []);

  React.useEffect(() => {
    execute();
  }, [execute]);

  React.useEffect(() => {
    if (state.isMovementCreated && state.movementType === movementType) {
      execute().then(() =>
        movementEventDispatch({
          type: MovementEventActionType.RESET_STATE,
        })
      );
    }
  }, [
    execute,
    movementEventDispatch,
    movementType,
    state.isMovementCreated,
    state.movementType,
  ]);

  return (
    <div>
      {movementList.map((movement) => (
        <MovementCard key={movement.id} {...movement} />
      ))}
    </div>
  );
};
