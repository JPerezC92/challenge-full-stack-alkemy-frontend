import { Movement } from "src/modules/movements/models/Movement";

export interface MovementStore {
  updateMovement: (movement: Movement) => void;
}
