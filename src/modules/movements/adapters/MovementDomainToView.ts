import { MovementView } from "src/modules/movements/dto/MovementView";
import { Movement } from "src/modules/movements/models/Movement";

export function MovementDomainToView(Movement: Movement): MovementView {
  return {
    id: Movement.id,
    concept: Movement.concept,
    amount: Movement.amount.toFixed(2),
    date: Movement.date,
    type: Movement.type,
  };
}
