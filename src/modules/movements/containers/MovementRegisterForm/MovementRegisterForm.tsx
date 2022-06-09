import React from "react";
import {
  MovementCreatedEventActionType,
  useMovementCreatedEventState,
} from "src/modules/movements/context/MovementCreatedEvent.context";
import { MovementCreate } from "src/modules/movements/dto/MovementCreateDto";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { capitalize } from "src/modules/shared/utils/capitalize";
import { getCurrentDateString } from "src/modules/shared/utils/getCurrentDateString";

type MovementRegisterFormProps = {
  movementsRepository: MyRepository<MovementsRepository>;
};

export const MovementRegisterForm: React.FC<MovementRegisterFormProps> = ({
  movementsRepository,
}) => {
  const { movementCreatedEventDispatch } = useMovementCreatedEventState();

  const createMovement = useCallableRequest(async ({ abortController }) => {
    const _movementsRepository = movementsRepository({ abortController });
    return async (movementCreateDto: MovementCreate) => {
      await _movementsRepository.create(movementCreateDto);

      movementCreatedEventDispatch({
        type: MovementCreatedEventActionType.MOVEMENT_CREATED,
        payload: movementCreateDto.type,
      });
    };
  }, []);

  const { formValues, names, ids, handleChange, handleSubmit } =
    useForm<MovementCreate>({
      initialValues: {
        concept: "",
        amount: "",
        type: "",
        date: getCurrentDateString(),
      },
      onSubmit: async (values, resetValues) => {
        await createMovement.execute({
          ...values,
          amount: Number(values.amount),
          type: values.type as MovementType,
        });
        resetValues();
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <div>
          <label htmlFor={ids.concept}>{capitalize(names.concept)}: </label>
          <input
            id={ids.concept}
            name={names.concept}
            onChange={handleChange}
            type="text"
            value={formValues.concept}
            required
          />
        </div>

        <div>
          <label htmlFor={ids.amount}>{capitalize(names.amount)}</label>
          <input
            id={ids.amount}
            name={names.amount}
            onChange={handleChange}
            type="number"
            value={formValues.amount}
            required
          />
        </div>

        <div>
          <label htmlFor={ids.date}>{capitalize(names.date)}</label>
          <input
            id={ids.date}
            name={names.date}
            onChange={handleChange}
            type="date"
            value={formValues.date}
            required
          />
        </div>

        <div>
          <label htmlFor={ids.type}>{capitalize(names.type)}</label>
          <select
            id={ids.type}
            name={names.type}
            onChange={handleChange}
            value={formValues.type}
            required
          >
            <option key="" value="" disabled>
              Select a type
            </option>
            {Object.entries(MovementType).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </>
  );
};
