import React from "react";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { MovementStore } from "src/modules/movements/store/MovementStore";
import { Button } from "src/modules/shared/components/Button";
import { Input } from "src/modules/shared/components/Input";
import { Label } from "src/modules/shared/components/Label";
import { RequiredField } from "src/modules/shared/components/RequiredField";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { MyStore } from "src/modules/shared/store/MyStore";
import { capitalize } from "src/modules/shared/utils/capitalize";

type MovementEditFormProps = {
  movementsRepository: MyRepository<MovementsRepository>;
  movementStore: MyStore<MovementStore>;
  toggleIsEditing: () => void;
  className?: string;
} & MovementView;

export const MovementEditForm: React.FC<MovementEditFormProps> = ({
  className,
  movementsRepository,
  movementStore,
  toggleIsEditing,
  ...movementView
}) => {
  const [updateMovement] = useCallableRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });
      const _movementStore = movementStore();
      return async (movement: Movement) => {
        await _movementsRepository.update({
          movementId: movementView.id,
          movement,
        });

        const _movement = await _movementsRepository.findById(movementView.id);

        if (!_movement) return;

        _movementStore.updateMovement(_movement);
      };
    },
    [movementView.id, movementStore, movementsRepository]
  );

  const { formValues, ids, names, handleSubmit, handleChange } =
    useForm<Movement>({
      initialValues: {
        amount: movementView.amount,
        date: movementView.date,
        concept: movementView.concept,
        id: movementView.id,
        type: movementView.type,
      },
      onSubmit: async (values) => {
        await updateMovement({
          ...values,
          id: movementView.id,
          type: movementView.type,
          amount: parseFloat(values.amount),
        });
        toggleIsEditing();
      },
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-2 ${className}`}
      >
        <div>
          <Label htmlFor={ids.id}>{names.id}</Label>
          <Input
            id={ids.id}
            name={names.id}
            type="text"
            value={formValues.id}
            disabled
          />
        </div>

        <div>
          <Label htmlFor={ids.concept}>
            {names.concept} <RequiredField />
          </Label>
          <Input
            autoFocus
            id={ids.concept}
            name={names.concept}
            onChange={handleChange}
            type="text"
            value={formValues.concept}
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.amount}>
            {names.amount} <RequiredField />
          </Label>
          <Input
            id={ids.amount}
            min={0}
            name={names.amount}
            onChange={handleChange}
            step=".01"
            type="number"
            value={formValues.amount}
            required
          />
        </div>

        <div>
          <Label htmlFor={ids.date}>
            {names.date} <RequiredField />
          </Label>
          <Input
            id={ids.date}
            name={names.date}
            onChange={handleChange}
            type="date"
            value={formValues.date}
            required
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 font-semibold">
          <Button
            type="button"
            secondary
            outline
            onClick={toggleIsEditing}
            className="p-1"
          >
            Cancel
          </Button>

          <Button primary type="submit" className="p-1">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
