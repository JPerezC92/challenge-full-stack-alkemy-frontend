import { MovementCreateDto } from "src/modules/movements/dto/MovementCreateDto";
import { Movement } from "src/modules/movements/models/Movement";
import { MovementType } from "src/modules/movements/models/MovementType";
import { OrderType } from "src/modules/shared/models/OrderType";

export interface MovementsRepository {
  query(query: {
    limit?: number;
    movementType?: MovementType;
    order?: OrderType;
    page?: number;
  }): Promise<Movement[]>;
  create(movementCreateDto: Omit<Movement, "id">): Promise<void>;
}
