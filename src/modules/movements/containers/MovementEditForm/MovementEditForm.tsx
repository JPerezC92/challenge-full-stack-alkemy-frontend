import React from "react";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { MovementStore } from "src/modules/movements/store/MovementStore";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { MyStore } from "src/modules/shared/store/MyStore";
import { capitalize } from "src/modules/shared/utils/capitalize";

type MovementEditFormProps = {
  movementsRepository: MyRepository<MovementsRepository>;
  movementStore: MyStore<MovementStore>;
  toggleIsEditing: () => void;
} & MovementView;

export const MovementEditForm: React.FC<MovementEditFormProps> = ({
  movementsRepository,
  movementStore,
  toggleIsEditing,
  ...movementView
}) => {
  const updateMovement = useCallableRequest(
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
        await updateMovement.execute({
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
      <h1>MovementEditForm</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={ids.id}>{capitalize(names.id)}: </label>
          <input
            id={ids.id}
            name={names.id}
            type="text"
            value={formValues.id}
            disabled
          />
        </div>

        <div>
          <label htmlFor={ids.concept}>{capitalize(names.concept)}: </label>
          <input
            autoFocus
            id={ids.concept}
            name={names.concept}
            onChange={handleChange}
            type="text"
            value={formValues.concept}
          />
        </div>

        <div>
          <label htmlFor={ids.amount}>{capitalize(names.amount)}: </label>
          <input
            id={ids.amount}
            min={0}
            name={names.amount}
            onChange={handleChange}
            type="number"
            value={formValues.amount}
          />
        </div>

        <div>
          <label htmlFor={ids.date}>{capitalize(names.date)}: </label>
          <input
            id={ids.date}
            name={names.date}
            onChange={handleChange}
            type="date"
            value={formValues.date}
          />
        </div>

        <button type="submit">Save</button>

        <button type="button" onClick={toggleIsEditing}>
          Cancel
        </button>
      </form>
    </>
  );
};
