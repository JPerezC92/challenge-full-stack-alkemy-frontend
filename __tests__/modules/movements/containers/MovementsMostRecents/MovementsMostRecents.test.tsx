import { render, waitFor } from "@testing-library/react";
import { MovementsMostRecents } from "src/modules/movements/containers/MovementsMostRecents";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { MovementType } from "src/modules/movements/models/MovementType";
import * as useNodeMovementsRepository from "src/modules/movements/service/useNodeMovements.repository";
import { OrderType } from "src/modules/shared/models/OrderType";

const movementList = Array(10)
  .fill("")
  .map(
    (_, index): MovementEndpoint => ({
      id: (index + 1).toString(),
      amount: 1000 * (index + 1),
      concept: "move ",
      date: new Date(),
      type: MovementType.EXPENSE,
    })
  );

const query = jest.fn().mockResolvedValue(movementList);

jest
  .spyOn(useNodeMovementsRepository, "useNodeMovementsRepository")
  .mockReturnValue(() => ({ query }));

describe("MovementsMostRecents container", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should match the snapshot", async () => {
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

    expect(component.container).toMatchSnapshot();
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

    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith({ limit: 10, order: OrderType.DESC });
  });
});
