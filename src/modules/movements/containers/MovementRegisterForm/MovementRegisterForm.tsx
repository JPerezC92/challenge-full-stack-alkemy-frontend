import React from "react";
import { MovementCreate } from "src/modules/movements/dto/MovementCreateDto";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { Button } from "src/modules/shared/components/Button";
import { Input } from "src/modules/shared/components/Input";
import { Label } from "src/modules/shared/components/Label";
import { RequiredField } from "src/modules/shared/components/RequiredField";
import { Select } from "src/modules/shared/components/Select";
import { useCallableRequest } from "src/modules/shared/hooks/useCallableRequest";
import { useForm } from "src/modules/shared/hooks/useForm";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { capitalize } from "src/modules/shared/utils/capitalize";
import { getCurrentDateString } from "src/modules/shared/utils/getCurrentDateString";

type MovementRegisterFormProps = {
  movementsRepository: MyRepository<MovementsRepository>;
  onCreate?: (movementType: MovementType) => void;
  className?: string;
};

export const MovementRegisterForm: React.FC<MovementRegisterFormProps> = ({
  movementsRepository,
  className,
  onCreate,
}) => {
  const [createMovement] = useCallableRequest(
    async ({ abortController }) => {
      const _movementsRepository = movementsRepository({ abortController });
      return async (movementCreate: MovementCreate) => {
        await _movementsRepository.create(movementCreate);
        onCreate?.(movementCreate.type);
      };
    },
    [movementsRepository, onCreate]
  );

  const { formValues, names, ids, handleChange, handleSubmit, resetValues } =
    useForm<MovementCreate>({
      initialValues: {
        concept: "",
        amount: "",
        type: "",
        date: getCurrentDateString(),
      },
      onSubmit: async (values, resetValues) => {
        await createMovement({
          ...values,
          amount: Number(values.amount),
          type: values.type as MovementType,
        });
        resetValues();
      },
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        role="form"
        className={`flex w-full flex-col gap-2 rounded border border-cyan-200 bg-teal-300/10 p-2 shadow-md ${className}`}
      >
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
            name={names.amount}
            onChange={handleChange}
            type="number"
            step="0.1"
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

        <div>
          <Label htmlFor={ids.type}>
            {names.type} <RequiredField />
          </Label>
          <Select
            id={ids.type}
            name={names.type}
            onChange={handleChange}
            value={formValues.type}
            required
            className="capitalize"
          >
            <option key="" value="" disabled>
              Select a type
            </option>
            {Object.entries(MovementType).map(([key, value]) => (
              <option key={key} value={value} className="capitalize">
                {value}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button type="button" secondary outline onClick={resetValues}>
            Clear
          </Button>

          <Button type="submit" primary>
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
