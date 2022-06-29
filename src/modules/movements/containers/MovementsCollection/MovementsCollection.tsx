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
import { Button } from "src/modules/shared/components/Button";
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
      <div className="mb-4 flex space-x-2">
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            primary
            className="min-w-[1.8rem] p-0 px-2"
            outline={page !== currentPage}
            onClick={() => updatePage(page)}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {movementList.map((movement) => (
          <MovementCard
            className="col-span-12 sm:col-span-6"
            key={movement.id}
            {...movement}
          />
        ))}
      </div>
    </div>
  );
};
