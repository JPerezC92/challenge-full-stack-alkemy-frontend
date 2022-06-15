import React from "react";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementDeleteButtonProps = {
  movementId: Movement["id"];
  movementsRepository: MyRepository<MovementsRepository>;
  onDelete?: () => void;
};

export const MovementDeleteButton: React.FC<MovementDeleteButtonProps> = ({
  movementId,
  movementsRepository,
  onDelete,
}) => {
  const deleteMovement = useCallableRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });

      return async ({ movementId }: { movementId: Movement["id"] }) => {
        await _movementsRepository.delete(movementId);
        onDelete?.();
      };
    },
    [movementsRepository, onDelete]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => deleteMovement.execute({ movementId })}
      >
        Delete
      </button>
    </>
  );
};
