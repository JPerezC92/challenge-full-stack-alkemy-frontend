import { act, fireEvent, render, screen } from "@testing-library/react";
import { MovementDeleteButton } from "src/modules/movements/containers/MovementDeleteButton";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";

const movementsRepository: MovementsRepository = {
  delete: jest.fn(),
} as unknown as MovementsRepository;

const movementId = Date.now().toString();

describe("MovementDeleteButton container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render a button", () => {
    render(
      <MovementDeleteButton
        movementId={movementId}
        movementsRepository={() => movementsRepository}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should call the delete method of the movements repository when the button is clicked", async () => {
    render(
      <MovementDeleteButton
        movementId={movementId}
        movementsRepository={() => movementsRepository}
      />
    );

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(movementsRepository.delete).toHaveBeenCalledTimes(1);
    expect(movementsRepository.delete).toHaveBeenCalledWith(movementId);
  });
});
