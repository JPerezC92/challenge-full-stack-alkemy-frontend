export enum MovementType {
  INCOME = "income",
  EXPENSE = "expense",
}

export function isMovementType(
  movementType: any
): movementType is MovementType {
  return Object.values(MovementType).includes(movementType);
}
