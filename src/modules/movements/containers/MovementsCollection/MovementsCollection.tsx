import React from "react";
import { MovementCard } from "src/modules/movements/components/MovementCard";
import {
  MovementEventActionType,
  useMovementEventState,
} from "src/modules/movements/context/MovementEventProvider.context";
import { usePagination } from "src/modules/movements/hooks/usePagination";
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

  const { currentPage, pages, updatePagesCount, updatePage } = usePagination();

  const canUpdateMovements =
    (state.isMovementCreated || state.isMovementDeleted) &&
    state.movementType === movementType;

  const [findMovements] = useCallableRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });
      const _movementListStore = movementListStore();
      return async ({ movementType }: { movementType: MovementType }) => {
        const result = await _movementsRepository.query({
          movementType,
          order: OrderType.DESC,
          limit: 10,
          page: currentPage,
        });

        if (!result) return;

        _movementListStore.updateMovementList(result.movementList);
        updatePagesCount(result.pages);
      };
    },
    [currentPage, movementListStore, movementsRepository, updatePagesCount]
  );

  React.useEffect(() => {
    findMovements({ movementType });
  }, [findMovements, movementType]);

  React.useEffect(() => {
    if (canUpdateMovements) {
      findMovements({ movementType }).then(() =>
        movementEventDispatch({ type: MovementEventActionType.RESET_STATE })
      );
    }
  }, [canUpdateMovements, findMovements, movementEventDispatch, movementType]);

  return (
    <div>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => updatePage(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      {movementList.map((movement) => (
        <MovementCard key={movement.id} {...movement} />
      ))}
    </div>
  );
};
