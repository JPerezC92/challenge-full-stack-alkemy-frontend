import { JsendSuccess } from "src/modules/shared/service/JsendResponse";
import { MovementEndpoint } from "./MovementEndpoint";

export interface MovementsGetEndpoint
  extends JsendSuccess<{ movementList: MovementEndpoint[]; pages: number }> {}
