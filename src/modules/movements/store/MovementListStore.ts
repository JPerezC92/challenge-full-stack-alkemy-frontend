import { MovementEndpoint } from "../dto/MovementEndpoint";

export interface MovementListStore {
  updateMovementList: (movements: MovementEndpoint[]) => void;
}
