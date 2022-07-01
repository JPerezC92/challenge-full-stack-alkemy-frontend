import { act, fireEvent, render, screen } from "@testing-library/react";
import { MovementDeleteButton } from "src/modules/movements/containers/MovementDeleteButton";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";

const movementsRepository: MovementsRepository = {
  delete: jest.fn(),
} as unknown as MovementsRepository;

const onDelete = jest.fn();

const movement: MovementView = {
  id: Date.now().toString(),
  amount: "",
  concept: "concept",
  date: "2020-01-01",
  type: MovementType.INCOME,
};

describe("MovementDeleteButton container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render a button", () => {
    render(
      <MovementDeleteButton
        {...movement}
        movementsRepository={() => movementsRepository}
        onDelete={onDelete}
      >
        Delete
      </MovementDeleteButton>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should call the delete method of the movements repository when the button is clicked", async () => {
    render(
      <MovementDeleteButton
        {...movement}
        movementsRepository={() => movementsRepository}
        onDelete={onDelete}
      >
        Delete
      </MovementDeleteButton>
    );

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(movementsRepository.delete).toHaveBeenCalledTimes(1);
    expect(movementsRepository.delete).toHaveBeenCalledWith(movement);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith();
  });
});
