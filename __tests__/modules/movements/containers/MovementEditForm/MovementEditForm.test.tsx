import { act, fireEvent, render, screen } from "@testing-library/react";
import { MovementDomainToView } from "src/modules/movements/adapters/MovementDomainToView";
import { MovementEditForm } from "src/modules/movements/containers/MovementEditForm";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { MovementStore } from "src/modules/movements/store/MovementStore";

const movement: Movement = {
  amount: 78.5,
  concept: "concept",
  date: "2020-01-01",
  id: "1",
  type: MovementType.EXPENSE,
};

const movementUpdated: Movement = {
  amount: 28.5,
  concept: "concept edited",
  date: "2020-01-05",
  id: "1",
  type: MovementType.EXPENSE,
};

const movementsRepository: MovementsRepository = {
  create: jest.fn(),
  findById: jest.fn().mockResolvedValue(movementUpdated),
  query: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const movementStore: MovementStore = {
  updateMovement: jest.fn(),
};

const toggleIsEditing = jest.fn();

describe("MovementEditForm container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the input fields and buttons", () => {
    render(
      <MovementEditForm
        movementsRepository={() => movementsRepository}
        movementStore={() => movementStore}
        toggleIsEditing={toggleIsEditing}
        {...MovementDomainToView(movement)}
      />
    );

    expect(screen.getByLabelText(/id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/concep/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  test("fields should have the correct values", () => {
    render(
      <MovementEditForm
        movementsRepository={() => movementsRepository}
        movementStore={() => movementStore}
        toggleIsEditing={toggleIsEditing}
        {...MovementDomainToView(movement)}
      />
    );

    expect(screen.getByLabelText(/id/i)).toHaveValue(movement.id);
    expect(screen.getByLabelText(/concept/i)).toHaveValue(movement.concept);
    expect(screen.getByLabelText(/amount/i)).toHaveValue(movement.amount);
    expect(screen.getByLabelText(/date/i)).toHaveValue(movement.date);
  });

  test("should update the form fields and execute the update action with the correct parameters", async () => {
    render(
      <MovementEditForm
        movementsRepository={() => movementsRepository}
        movementStore={() => movementStore}
        toggleIsEditing={toggleIsEditing}
        {...MovementDomainToView(movement)}
      />
    );

    const conceptInput = screen.getByLabelText(/concept/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const dateInput = screen.getByLabelText(/date/i);
    const submitButton = screen.getByText(/save/i);

    await act(async () => {
      fireEvent.change(conceptInput, {
        target: { value: movementUpdated.concept },
      });
      fireEvent.change(amountInput, {
        target: { value: movementUpdated.amount },
      });
      fireEvent.change(dateInput, { target: { value: movementUpdated.date } });

      fireEvent.submit(submitButton);
    });

    expect(movementsRepository.update).toHaveBeenCalledTimes(1);
    expect(movementsRepository.update).toHaveBeenCalledWith({
      movementId: movementUpdated.id,
      movement: { ...movementUpdated },
    });
    expect(movementsRepository.findById).toHaveBeenCalledTimes(1);
    expect(movementsRepository.findById).toHaveBeenCalledWith(
      movementUpdated.id
    );
    expect(movementStore.updateMovement).toHaveBeenCalledTimes(1);
    expect(movementStore.updateMovement).toHaveBeenCalledWith(movementUpdated);

    expect(toggleIsEditing).toHaveBeenCalledTimes(1);
    expect(toggleIsEditing).toHaveBeenCalledWith();
  });
});
