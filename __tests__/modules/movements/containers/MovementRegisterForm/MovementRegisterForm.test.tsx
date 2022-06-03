import { act, fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
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
  test("should match the snapshot", async () => {
    const component = renderer
      .create(
        <MovementRegisterForm
          movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test("should call MovementsRepository.create with the correct parameters", async () => {
    const movementCreateDto: MovementCreateDto = {
      amount: 1000,
      concept: "concept",
      type: MovementType.INCOME,
    };

    const component = render(
      <MovementRegisterForm
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
      />
    );

    const form = component.getByRole("form");
    const conceptInput = component.getByLabelText("Concept");
    const amountInput = component.getByLabelText("Amount");
    const typeSelect = component.getByLabelText("Type");

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

      fireEvent.submit(form);
    });

    expect(movementsRepository.create).toHaveBeenCalledTimes(1);
    expect(movementsRepository.create).toHaveBeenCalledWith(movementCreateDto);
  });
});
