import React from "react";
import { MovementEndpointToDomain } from "src/modules/movements/adapters/MovementEndpointToDomain";
import { MovementsGetEndpoint } from "src/modules/movements/dto/MovementsGetEndpoint";
import { MovementsPostEndpoint } from "src/modules/movements/dto/MovementsPostEndpoint";
import { Movement } from "src/modules/movements/models/Movement";
import { JsendStatus } from "src/modules/shared/service/JsendResponse";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { MovementsRepository } from "./MovementsRepository";

export function useNodeMovementsRepository(): MyRepository<MovementsRepository> {
  return React.useCallback(({ abortController }) => {
    const movementsApiUrl = `${BASE_API_URL}/movements`;

    return {
      query: async ({
        page,
        limit,
        order,
        movementType,
      }): Promise<Movement[]> => {
        const searchParams = new URLSearchParams();
        if (page) searchParams.set("page", page.toString());
        if (limit) searchParams.set("limit", limit.toString());
        if (order) searchParams.set("order", order);
        if (movementType) searchParams.set("movement-type", movementType);

        const response = await fetch(
          `${movementsApiUrl}/?${searchParams.toString()}`,
          { method: "GET", signal: abortController.signal }
        );

        const movementsGetEndpoint =
          (await response.json()) as MovementsGetEndpoint;

        return movementsGetEndpoint.data.map(MovementEndpointToDomain);
      },
      create: async (movementCreate): Promise<void> => {
        const response = await fetch(`${movementsApiUrl}`, {
          body: JSON.stringify(movementCreate),
          headers: { "Content-Type": "application/json" },
          method: "POST",
          signal: abortController.signal,
        });

        const movementsPostEndpoint =
          (await response.json()) as MovementsPostEndpoint;

        if (movementsPostEndpoint.status !== JsendStatus.success) {
          console.log({ movementsPostEndpoint });
        }
      },
    };
  }, []);
}
