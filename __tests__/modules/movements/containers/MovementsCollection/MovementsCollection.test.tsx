import { render, screen } from "@testing-library/react";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import { MovementEventProvider } from "src/modules/movements/context/MovementEventProvider.context";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";
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
  query: jest.fn().mockResolvedValue({ movementList, pages: 1 }),
} as unknown as MovementsRepository;

jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(() => movementsRepository);

describe("MovementsCollection container", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should list the movements", async () => {
    render(
      <MovementsCollection
        movementType={MovementType.INCOME}
        movementsRepository={useNodeMovementsRepository.useNodeMovementsRepository()}
      />,
      { wrapper: MovementEventProvider }
    );

    expect(await screen.findByText("concept 1")).toBeInTheDocument();
    expect(await screen.findByText("concept 10")).toBeInTheDocument();

    expect(movementsRepository.query).toHaveBeenCalledTimes(1);
    expect(movementsRepository.query).toHaveBeenCalledWith({
      movementType: MovementType.INCOME,
      order: OrderType.DESC,
      limit: 10,
      page: 1,
    });
  });
});
