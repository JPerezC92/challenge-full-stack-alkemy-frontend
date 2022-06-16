import {
  JsendError,
  JsendFail,
  JsendSuccess,
} from "src/modules/shared/service/JsendResponse";
import { UserEndpoint } from "./UserEndpoint";

export type AuthLoginPostEndpoint =
  | JsendSuccess<{
      accessToken: string;
      refreshToken: string;
      user: UserEndpoint;
    }>
  | JsendError
  | JsendFail;
