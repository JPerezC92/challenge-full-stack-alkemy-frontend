import React from "react";
import { MyRepository } from "src/modules/shared/service/MyRepository";
import { BASE_API_URL } from "src/modules/shared/utils/constants";
import { MovementEndpoint } from "../dto/MovementEndpoint";
import { MovementsGetEndpoint } from "../dto/MovementsGetEndpoint";
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
    };
  }, []);
}
