import { render, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MovementsMostRecents } from "src/modules/movements/containers/MovementsMostRecents";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";
import { MovementListStore } from "src/modules/movements/store/MovementListStore";
import * as useMovementListState from "src/modules/movements/store/useMovementListState";
import { OrderType } from "src/modules/shared/models/OrderType";

const movementList = Array(10)
  .fill("")
  .map(
    (_, index): MovementEndpoint => ({
      id: (index + 1).toString(),
      amount: 1000 * (index + 1),
      concept: "move",
      date: new Date(),
      type: MovementType.EXPENSE,
    })
  );

const movementListStore: MovementListStore = {
  updateMovementList: jest.fn(),
};

const movementsRepository: MovementsRepository = {
  create: jest.fn(),
  query: jest.fn().mockResolvedValue(movementList),
};

jest.spyOn(useMovementListState, "useMovementListState").mockReturnValue({
  movementList,
  movementListStore: () => movementListStore,
});
jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(jest.fn().mockReturnValue(movementsRepository));

describe("MovementsMostRecents container", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should match the snapshot", () => {
    const component = renderer
      .create(
        <MovementsMostRecents
          movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test("should call MovementsRepository.query with limit and order", async () => {
    const component = render(
      <MovementsMostRecents
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
      />
    );

    await waitFor(async () => {
      expect((await component.findAllByRole("listitem")).length).toBe(
        movementList.length
      );
    });

    expect(movementsRepository.query).toHaveBeenCalledWith({
      limit: 10,
      order: OrderType.DESC,
    });
    expect(movementsRepository.query).toHaveBeenCalledTimes(1);
    expect(movementListStore.updateMovementList).toHaveBeenCalledTimes(1);
    expect(movementListStore.updateMovementList).toHaveBeenCalledWith(
      movementList
    );
  });
});
