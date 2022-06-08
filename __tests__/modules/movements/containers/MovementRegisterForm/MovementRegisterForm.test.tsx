import { act, fireEvent, render } from "@testing-library/react";
import { MovementRegisterForm } from "src/modules/movements/containers/MovementRegisterForm";
import { MovementCreateDto } from "src/modules/movements/dto/MovementCreateDto";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";

const movementsRepository: MovementsRepository = {
  create: jest.fn(),
  query: jest.fn(),
};

jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(() => movementsRepository);

describe("MovementRegisterForm container", () => {
  test("should call MovementsRepository.create with the correct parameters", async () => {
    const movementCreateDto: MovementCreateDto = {
      amount: 1000,
      concept: "concept",
      type: MovementType.INCOME,
      date: "2020-01-01",
    };

    const component = render(
      <MovementRegisterForm
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
      />
    );

    const form = component.getByRole("form");
    const conceptInput = component.getByLabelText(/Concept/i);
    const amountInput = component.getByLabelText(/Amount/i);
    const typeSelect = component.getByLabelText(/Type/i);
    const dateInput = component.getByLabelText(/Date/i);

    await act(async () => {
      fireEvent.change(conceptInput, {
        target: { value: movementCreateDto.concept },
      });
      fireEvent.change(amountInput, {
        target: { value: movementCreateDto.amount },
      });
      fireEvent.change(typeSelect, {
        target: { value: movementCreateDto.type },
      });
      fireEvent.change(dateInput, {
        target: { value: movementCreateDto.date },
      });

      fireEvent.submit(form);
    });

    expect(movementsRepository.create).toHaveBeenCalledTimes(1);
    expect(movementsRepository.create).toHaveBeenCalledWith(movementCreateDto);
  });
});
