import { act, fireEvent, render } from "@testing-library/react";
import { MovementRegisterForm } from "src/modules/movements/containers/MovementRegisterForm";
import { MovementEventProvider } from "src/modules/movements/context/MovementEventProvider.context";
import { MovementCreate } from "src/modules/movements/dto/MovementCreateDto";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";

const movementsRepository: MovementsRepository = {
  create: jest.fn(),
} as unknown as MovementsRepository;

const onCreate = jest.fn();

jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(() => movementsRepository);

describe("MovementRegisterForm container", () => {
  test("should call MovementsRepository.create with the correct parameters", async () => {
    const movementCreate: MovementCreate = {
      amount: 1000,
      concept: "concept",
      type: MovementType.INCOME,
      date: "2020-01-01",
    };

    const component = render(
      <MovementRegisterForm
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
        onCreate={onCreate}
      />,
      { wrapper: MovementEventProvider }
    );

    const form = component.getByRole("form");
    const conceptInput = component.getByLabelText(/Concept/i);
    const amountInput = component.getByLabelText(/Amount/i);
    const typeSelect = component.getByLabelText(/Type/i);
    const dateInput = component.getByLabelText(/Date/i);

    await act(async () => {
      fireEvent.change(conceptInput, {
        target: { value: movementCreate.concept },
      });
      fireEvent.change(amountInput, {
        target: { value: movementCreate.amount },
      });
      fireEvent.change(typeSelect, {
        target: { value: movementCreate.type },
      });
      fireEvent.change(dateInput, {
        target: { value: movementCreate.date },
      });

      fireEvent.submit(form);
    });

    expect(movementsRepository.create).toHaveBeenCalledTimes(1);
    expect(movementsRepository.create).toHaveBeenCalledWith(movementCreate);
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(onCreate).toHaveBeenCalledWith(movementCreate.type);
  });
});
