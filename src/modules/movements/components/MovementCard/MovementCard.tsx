import React from "react";
import { MovementDeleteButton } from "src/modules/movements/containers/MovementDeleteButton";
import { MovementEditForm } from "src/modules/movements/containers/MovementEditForm";
import {
  MovementEventActionType,
  useMovementEventState,
} from "src/modules/movements/context/MovementEventProvider.context";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { useMovementState } from "src/modules/movements/store/useMovementState";

type MovementCardProps = MovementView;

export const MovementCard: React.FC<MovementCardProps> = (movementView) => {
  const { movementEventDispatch } = useMovementEventState();
  const movementsRepository = useNodeMovementsRepository();

  const { movement, movementStore } = useMovementState(movementView);
  const [isEditing, setIsEditing] = React.useState(false);
  const _movementView = movement || movementView;
  const { id, amount, concept, type } = _movementView;

  const toggleIsEditing = React.useCallback(
    () => setIsEditing((state) => !state),
    []
  );

  const handleOnDelete = React.useCallback(() => {
    movementEventDispatch({
      payload: _movementView.type,
      type: MovementEventActionType.MOVEMENT_DELETED,
    });
  }, [_movementView.type, movementEventDispatch]);

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

      <MovementDeleteButton
        movementId={id}
        movementsRepository={movementsRepository}
        onDelete={handleOnDelete}
      />

      <button type="button" onClick={toggleIsEditing}>
        Edit
      </button>
    </article>
  );
};
