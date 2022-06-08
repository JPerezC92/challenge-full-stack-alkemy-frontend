import { MovementCreateDto } from "src/modules/movements/dto/MovementCreateDto";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";
import { MovementType } from "src/modules/movements/models/MovementType";
import { OrderType } from "src/modules/shared/models/OrderType";

export interface MovementsRepository {
  query(query: {
    limit?: number;
    movementType?: MovementType;
    order?: OrderType;
    page?: number;
  }): Promise<MovementEndpoint[]>;
  create(movementCreateDto: MovementCreateDto): Promise<void>;
}
