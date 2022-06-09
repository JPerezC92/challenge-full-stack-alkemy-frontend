import React from "react";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementDeleteButtonProps = {
  movementsRepository: MyRepository<MovementsRepository>;
  movementId: Movement["id"];
};

export const MovementDeleteButton: React.FC<MovementDeleteButtonProps> = ({
  movementId,
  movementsRepository,
}) => {
  const deleteMovement = useCallableRequest(async ({ abortController }) => {
    const _movementsRepository = movementsRepository({ abortController });

    return async ({ movementId }: { movementId: Movement["id"] }) => {
      await _movementsRepository.delete(movementId);
    };
  }, []);

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
