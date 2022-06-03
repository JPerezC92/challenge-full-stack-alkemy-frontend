export type MapToStringValues<Values> = {
  [k in keyof Values]: string;
};
