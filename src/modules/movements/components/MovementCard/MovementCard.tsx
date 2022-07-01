import React from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { MovementDeleteButton } from "src/modules/movements/containers/MovementDeleteButton";
import { MovementEditForm } from "src/modules/movements/containers/MovementEditForm";
import {
  MovementEventActionType,
  useMovementEventState,
} from "src/modules/movements/context/MovementEventProvider.context";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { useMovementState } from "src/modules/movements/store/useMovementState";
import { Button } from "src/modules/shared/components/Button";

type MovementCardProps = { className?: string } & MovementView;

export const MovementCard: React.FC<MovementCardProps> = ({
  className,
  ...movementView
}) => {
  const { movementEventDispatch } = useMovementEventState();
  const movementsRepository = useNodeMovementsRepository();

  const { movement, movementStore } = useMovementState(movementView);
  const [isEditing, setIsEditing] = React.useState(false);
  const _movementView = movement || movementView;
  const { id, amount, concept, date } = _movementView;

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
        className={`rounded border border-cyan-500/30 p-2 ${className}`}
        movementsRepository={movementsRepository}
        movementStore={movementStore}
        toggleIsEditing={toggleIsEditing}
        {..._movementView}
      />
    );
  }

  return (
    <article
      className={`flex flex-col gap-4 rounded border border-cyan-500/30 p-2 ${className}`}
    >
      <header className="flex">
        <h3 className="font-bold">{concept}</h3>

        <div className="ml-auto grid grid-cols-2 gap-3">
          <Button
            type="button"
            primary
            outline
            className="p-1"
            onClick={toggleIsEditing}
          >
            <MdOutlineEdit />
          </Button>

          <MovementDeleteButton
            className="p-1"
            movementsRepository={movementsRepository}
            onDelete={handleOnDelete}
            {..._movementView}
          >
            <i>
              <MdDeleteOutline />
            </i>
          </MovementDeleteButton>
        </div>
      </header>

      <div className="flex items-center text-lg">
        <span className="min-w-max text-sm font-semibold italic text-gray-400">
          {date}
        </span>
        <span className="ml-auto">
          <b>${amount}</b>
        </span>
      </div>
    </article>
  );
};
