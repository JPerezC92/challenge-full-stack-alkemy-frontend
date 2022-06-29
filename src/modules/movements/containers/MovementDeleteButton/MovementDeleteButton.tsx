import React from "react";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { Button } from "src/modules/shared/components/Button";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementDeleteButtonProps = {
  className?: string;
  movementId: Movement["id"];
  movementsRepository: MyRepository<MovementsRepository>;
  onDelete?: () => void;
  children: React.ReactNode;
};

export const MovementDeleteButton: React.FC<MovementDeleteButtonProps> = ({
  movementId,
  movementsRepository,
  onDelete,
  className,
  children,
}) => {
  const [deleteMovement] = useCallableRequest(
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
      <Button
        secondary
        outline
        className={className}
        type="button"
        onClick={() => deleteMovement({ movementId })}
      >
        {children}
      </Button>
    </>
  );
};
