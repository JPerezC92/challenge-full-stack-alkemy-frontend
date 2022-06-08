import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementCreateDto {
  amount: number;
  concept: string;
  date: string;
  type: MovementType;
}
