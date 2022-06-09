import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { Movement } from "src/modules/movements/models/Movement";

export function MovementEndpointToDomain(
  movementEndpoint: MovementEndpoint
): Movement {
  return new Movement({
    id: movementEndpoint.id,
    concept: movementEndpoint.concept,
    amount: movementEndpoint.amount,
    date: movementEndpoint.date,
    type: movementEndpoint.type,
  });
}
