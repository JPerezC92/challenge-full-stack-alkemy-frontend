import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { OrderType } from "src/modules/shared/models/OrderType";
import { MovementCreateDto } from "../dto/MovementCreateDto";
import { MovementType } from "../models/MovementType";

export interface MovementsRepository {
  query(query: {
    limit?: number;
    movementType?: MovementType;
    order?: OrderType;
    page?: number;
  }): Promise<MovementEndpoint[]>;
  create(movementCreateDto: MovementCreateDto): Promise<void>;
}
