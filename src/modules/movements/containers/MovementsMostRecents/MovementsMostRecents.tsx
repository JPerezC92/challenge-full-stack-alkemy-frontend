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

      const result = await _movementsRepository.query({
        limit: 10,
        order: OrderType.DESC,
      });

      if (!result) return;

      _movementsListStore.updateMovementList(result.movementList);
    },
    [movementListStore, movementsRepository]
  );

  return (
    <section className="rounded-md bg-gradient-to-b from-indigo-100 to-indigo-50 p-4">
      <h2 className="mb-4 text-lg font-bold">Recent movements</h2>

      <ol className="grid grid-rows-[10] gap-4 sm:grid-cols-2 sm:grid-rows-5">
        {movementList.map((movement) => (
          <MovementRecentCard key={movement.id} {...movement} />
        ))}
      </ol>
    </section>
  );
};
