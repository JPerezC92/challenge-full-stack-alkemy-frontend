import React from "react";
import { MovementRecentCard } from "src/modules/movements/components/MovementRecentCard";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useMovementListState } from "src/modules/movements/store/useMovementListState";
import { useRequest } from "src/modules/shared/hooks/useRequest";
import { OrderType } from "src/modules/shared/models/OrderType";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementsMostRecentsProps = {
  movementsRepository: MyRepository<MovementsRepository>;
};

export const MovementsMostRecents: React.FC<MovementsMostRecentsProps> = ({
  movementsRepository,
}) => {
  const { movementList, movementListStore } = useMovementListState();

  useRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });
      const _movementsListStore = movementListStore();

      const movementList = await _movementsRepository.query({
        limit: 10,
        order: OrderType.DESC,
      });

      if (!movementList) return;

      _movementsListStore.updateMovementList(movementList);
    },
    [movementListStore, movementsRepository]
  );

  return (
    <div>
      <h2>Recent movements</h2>

      <ol>
        {movementList.map((movement) => (
          <MovementRecentCard key={movement.id} {...movement} />
        ))}
      </ol>
    </div>
  );
};
