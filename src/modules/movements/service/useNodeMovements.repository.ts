import React from "react";
import { MovementEndpointToDomain } from "src/modules/movements/adapters/MovementEndpointToDomain";
import { MovementsGetEndpoint } from "src/modules/movements/dto/MovementsGetEndpoint";
import { MovementsIdGetEndpoint } from "src/modules/movements/dto/MovementsIdGetEndpoint";
import { MovementsPostEndpoint } from "src/modules/movements/dto/MovementsPostEndpoint";
import { MovementsPutEndpoint } from "src/modules/movements/dto/MovementsPutEndpoint";
import { Movement } from "src/modules/movements/models/Movement";
import { JsendStatus } from "src/modules/shared/service/JsendResponse";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { MovementsDeleteEndpoint } from "../dto/MovementsDeleteEndpoint";
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
      findById: async (movementId): Promise<Movement | undefined> => {
        const response = await fetch(`${movementsApiUrl}/${movementId}`, {
          method: "GET",
          signal: abortController.signal,
        });

        const movementGetEndpoint =
          (await response.json()) as MovementsIdGetEndpoint;

        return MovementEndpointToDomain(movementGetEndpoint.data);
      },
      update: async ({
        movementId,
        movement: movementUpdate,
      }): Promise<void> => {
        const response = await fetch(`${movementsApiUrl}/${movementId}`, {
          body: JSON.stringify({
            amount: movementUpdate.amount,
            concept: movementUpdate.concept,
            date: movementUpdate.date,
          }),
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          signal: abortController.signal,
        });

        const result = (await response.json()) as MovementsPutEndpoint;

        if (result.status !== JsendStatus.success) {
          console.log(result);
        }
      },

      delete: async (movementId: Movement["id"]): Promise<void> => {
        const response = await fetch(`${movementsApiUrl}/${movementId}`, {
          method: "DELETE",
          signal: abortController.signal,
        });

        const result = (await response.json()) as MovementsDeleteEndpoint;

        if (result.status !== JsendStatus.success) {
          console.log(result);
        }
      },
    };
  }, []);
}
