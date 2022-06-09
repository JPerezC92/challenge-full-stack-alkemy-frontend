import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementCreate {
  amount: number;
  concept: string;
  date: string;
  type: MovementType;
}
