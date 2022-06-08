import React from "react";
import { MovementType } from "src/modules/movements/models/MovementType";

interface MovementCreatedEventStateContext {
  state: MovementCreatedEventState;
  movementCreatedEventDispatch: React.Dispatch<MovementCreatedEventAction>;
}

const MovementCreatedEventStateContext = React.createContext(
  {} as MovementCreatedEventStateContext
);

export function useMovementCreatedEventState() {
  const context = React.useContext(MovementCreatedEventStateContext);

  if (!context) {
    throw new Error(
      "useMovementCreatedEventState must be used within a MovementCreatedEventProvider"
    );
  }

  return context;
}

interface MovementCreatedEventState {
  movementType?: MovementType;
  isMovementCreated: boolean;
}

export const enum MovementCreatedEventActionType {
  MOVEMENT_CREATED = "MOVEMENT_CREATED",
  RESET_STATE = "RESET_STATE",
}

type MovementCreatedEventAction =
  | {
      type: MovementCreatedEventActionType.MOVEMENT_CREATED;
      payload: MovementType;
    }
  | { type: MovementCreatedEventActionType.RESET_STATE };

const initialState: MovementCreatedEventState = {
  isMovementCreated: false,
  movementType: undefined,
};

function reducer(
  state: MovementCreatedEventState,
  action: MovementCreatedEventAction
): MovementCreatedEventState {
  switch (action.type) {
    case MovementCreatedEventActionType.MOVEMENT_CREATED:
      return { isMovementCreated: true, movementType: action.payload };

    case MovementCreatedEventActionType.RESET_STATE:
      return { isMovementCreated: false, movementType: undefined };

    default:
      return state;
  }
}

export function MovementCreatedEventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, movementCreatedEventDispatch] = React.useReducer(
    reducer,
    initialState
  );

  return (
    <MovementCreatedEventStateContext.Provider
      value={{
        state,
        movementCreatedEventDispatch,
      }}
    >
      {children}
    </MovementCreatedEventStateContext.Provider>
  );
}
