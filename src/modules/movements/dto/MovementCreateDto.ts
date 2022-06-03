import { MovementType } from "../models/MovementType";

export interface MovementCreateDto {
  concept: string;
  amount: number;
  type: MovementType;
}
