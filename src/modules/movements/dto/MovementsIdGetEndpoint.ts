import { JsendSuccess } from "src/modules/shared/service/JsendResponse";
import { MovementEndpoint } from "./MovementEndpoint";

export interface MovementsIdGetEndpoint
  extends JsendSuccess<MovementEndpoint> {}
