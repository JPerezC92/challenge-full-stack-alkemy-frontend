import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementView {
  id: string;
  concept: string;
  amount: string;
  date: string;
  type: MovementType;
}
