import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementEndpoint {
  id: string;
  concept: string;
  amount: number;
  date: string;
  type: MovementType;
}
