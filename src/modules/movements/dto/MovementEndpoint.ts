import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementEndpoint {
  id: string;
  concept: string;
  amount: number;
  date: Date;
  type: MovementType;
}
