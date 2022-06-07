import { render, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";
import { MovementListStore } from "src/modules/movements/store/MovementListStore";
import * as useMovementListState from "src/modules/movements/store/useMovementListState";
import { OrderType } from "src/modules/shared/models/OrderType";

const movementList: MovementEndpoint[] = Array.from({ length: 10 }).map(
  (_, index) => ({
    id: (index + 1).toString(),
    type: MovementType.INCOME,
    amount: 1000 * (index + 1),
    concept: `concept ${index + 1}`,
    date: `2020-01-${index + 1}`,
  })
);

const movementsRepository: MovementsRepository = {
  query: jest.fn().mockResolvedValue(movementList),
  create: jest.fn(),
};

const movementListStore: MovementListStore = {
  updateMovementList: jest.fn(),
};

jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(() => movementsRepository);

jest.spyOn(useMovementListState, "useMovementListState").mockReturnValue({
  movementList,
  movementListStore: () => movementListStore,
});

describe("MovementsCollection container", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should match the snapshot", async () => {
    const component = renderer
      .create(
        <MovementsCollection
          movementType={MovementType.INCOME}
          movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
        />
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });

  test("should first", async () => {
    const component = render(
      <MovementsCollection
        movementType={MovementType.INCOME}
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
      />
    );

    await waitFor(async () =>
      expect(await component.findAllByRole("article")).toHaveLength(
        movementList.length
      )
    );

    expect(movementsRepository.query).toHaveBeenCalledTimes(1);
    expect(movementsRepository.query).toHaveBeenCalledWith({
      movementType: MovementType.INCOME,
      order: OrderType.DESC,
    });
    expect(movementListStore.updateMovementList).toHaveBeenCalledTimes(1);
    expect(movementListStore.updateMovementList).toHaveBeenCalledWith(
      movementList
    );
  });
});
