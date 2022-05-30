import { JsendSuccess } from "src/modules/shared/service/JsendResponse";

export type BalanceEndpoint = JsendSuccess<{ balance: number }>;
