import React from "react";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { Button } from "src/modules/shared/components/Button";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { MovementView } from "../../dto/MovementView";

type MovementDeleteButtonProps = {
  className?: string;
  movementsRepository: MyRepository<MovementsRepository>;
  onDelete?: () => void;
  children?: React.ReactNode;
} & MovementView;

export const MovementDeleteButton: React.FC<MovementDeleteButtonProps> = ({
  movementsRepository,
  onDelete,
  className,
  children,
  ...movementView
}) => {
  const [deleteMovement] = useCallableRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });

      return async (movement: Pick<Movement, "id" | "concept">) => {
        await _movementsRepository.delete(movement);
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
        onClick={() => deleteMovement(movementView)}
      >
        {children}
      </Button>
    </>
  );
};
