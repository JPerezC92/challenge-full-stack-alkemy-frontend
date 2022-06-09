import { Movement } from "src/modules/movements/models/Movement";

export interface MovementListStore {
  updateMovementList: (movements: Movement[]) => void;
}
