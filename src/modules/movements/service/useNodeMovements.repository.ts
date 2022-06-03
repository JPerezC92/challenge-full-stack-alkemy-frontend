import React from "react";
import { JsendStatus } from "src/modules/shared/service/JsendResponse";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { MovementEndpoint } from "../dto/MovementEndpoint";
import { MovementsGetEndpoint } from "../dto/MovementsGetEndpoint";
import { MovementsPostEndpoint } from "../dto/MovementsPostEndpoint";
import { MovementsRepository } from "./MovementsRepository";

export function useNodeMovementsRepository(): MyRepository<MovementsRepository> {
  return React.useCallback(({ abortController }) => {
    const movementsApiUrl = `${BASE_API_URL}/movements`;

    return {
      query: async ({ page, limit, order }): Promise<MovementEndpoint[]> => {
        const searchParams = new URLSearchParams();
        if (page) searchParams.set("page", page.toString());
        if (limit) searchParams.set("limit", limit.toString());
        if (order) searchParams.set("order", order);

        const response = await fetch(
          `${movementsApiUrl}/?${searchParams.toString()}`,
          { method: "GET", signal: abortController.signal }
        );

        const movementsGetEndpoint =
          (await response.json()) as MovementsGetEndpoint;

        return movementsGetEndpoint.data;
      },
      create: async (movementCreateDto): Promise<void> => {
        const response = await fetch(`${movementsApiUrl}`, {
          body: JSON.stringify(movementCreateDto),
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
