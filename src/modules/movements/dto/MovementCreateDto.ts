import { MovementType } from "src/modules/movements/models/MovementType";

export interface MovementCreateDto {
  concept: string;
  amount: number;
  type: MovementType;
}
