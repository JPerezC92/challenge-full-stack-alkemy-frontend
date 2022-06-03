import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { OrderType } from "src/modules/shared/models/OrderType";
import { MovementCreateDto } from "../dto/MovementCreateDto";

export interface MovementsRepository {
  query(query: {
    page?: number;
    limit?: number;
    order?: OrderType;
  }): Promise<MovementEndpoint[]>;
  create(movementCreateDto: MovementCreateDto): Promise<void>;
}
