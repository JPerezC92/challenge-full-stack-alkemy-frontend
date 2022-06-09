import React from "react";
import { MovementEditForm } from "src/modules/movements/containers/MovementEditForm";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { useMovementState } from "src/modules/movements/store/useMovementState";

type MovementCardProps = MovementView;

export const MovementCard: React.FC<MovementCardProps> = (movementView) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const movementsRepository = useNodeMovementsRepository();

  const { movement, movementStore } = useMovementState(movementView);
  const _movementView = movement || movementView;
  const { id, amount, concept, type } = _movementView;

  const toggleIsEditing = React.useCallback(
    () => setIsEditing((state) => !state),
    []
  );

  if (isEditing) {
    return (
      <MovementEditForm
        movementsRepository={movementsRepository}
        movementStore={movementStore}
        toggleIsEditing={toggleIsEditing}
        {..._movementView}
      />
    );
  }

  return (
    <article>
      <p>{id}</p>
      <p>{amount}</p>
      <p>{concept}</p>
      <p>{type}</p>

      <button type="button" onClick={toggleIsEditing}>
        Edit
      </button>
    </article>
  );
};
