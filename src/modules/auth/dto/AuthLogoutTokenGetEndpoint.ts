import {
  JsendError,
  JsendFail,
  JsendSuccess,
} from "src/modules/shared/service/JsendResponse";

export type AuthLogoutTokenGetEndpoint = JsendSuccess | JsendError | JsendFail;
