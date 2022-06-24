import { Movement } from "src/modules/movements/models/Movement";
import { MovementType } from "src/modules/movements/models/MovementType";
import { OrderType } from "src/modules/shared/models/OrderType";

export interface MovementsRepository {
  query(query: {
    limit?: number;
    movementType?: MovementType;
    order?: OrderType;
    page?: number;
  }): Promise<{ movementList: Movement[]; pages: number } | void>;
  create(movementCreate: Omit<Movement, "id">): Promise<void>;
  findById(movementId: Movement["id"]): Promise<Movement | undefined>;
  update(props: {
    movementId: Movement["id"];
    movement: Movement;
  }): Promise<void>;
  delete(movementId: Movement["id"]): Promise<void>;
}
