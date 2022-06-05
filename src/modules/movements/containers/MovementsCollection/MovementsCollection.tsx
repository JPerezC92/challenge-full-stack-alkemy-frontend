import { MovementCard } from "src/modules/movements/components/MovementCard";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useMovementListState } from "src/modules/movements/store/useMovementListState";
import { useRequest } from "src/modules/shared/hooks/useRequest";
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
  const { movementList, movementListStore } = useMovementListState();

  useRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });
      const _movementListStore = movementListStore();
      const movementList = await _movementsRepository.query({
        movementType,
        order: OrderType.DESC,
      });

      _movementListStore.updateMovementList(movementList);
    },
    [movementListStore, movementType, movementsRepository]
  );

  return (
    <div>
      {movementList.map((movement) => (
        <MovementCard key={movement.id} {...movement} />
      ))}
    </div>
  );
};
