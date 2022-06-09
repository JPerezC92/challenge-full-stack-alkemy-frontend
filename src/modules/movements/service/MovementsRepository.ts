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
  create(movementCreate: Omit<Movement, "id">): Promise<void>;
  findById(movementId: string): Promise<Movement | undefined>;
  update(props: { movementId: string; movement: Movement }): Promise<void>;
}
