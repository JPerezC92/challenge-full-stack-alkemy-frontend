import React from "react";
import { MovementType } from "src/modules/movements/models/MovementType";

interface MovementEventStateContext {
  state: MovementEventState;
  movementEventDispatch: React.Dispatch<MovementEventAction>;
}

const MovementEventStateContext = React.createContext(
  {} as MovementEventStateContext
);

export function useMovementEventState() {
  const context = React.useContext(MovementEventStateContext);

  if (!context) {
    throw new Error(
      "useMovementEventState must be used within a MovementEventProvider"
    );
  }

  return context;
}

interface MovementEventState {
  movementType?: MovementType;
  isMovementCreated: boolean;
}

export const enum MovementEventActionType {
  MOVEMENT_CREATED = "MOVEMENT_CREATED",
  MOVEMENT_DELETED = "MOVEMENT_DELETED",
  RESET_STATE = "RESET_STATE",
}

type MovementEventAction =
  | {
      type: MovementEventActionType.MOVEMENT_CREATED;
      payload: MovementType;
    }
  | {
      type: MovementEventActionType.MOVEMENT_DELETED;
      payload: MovementType;
    }
  | { type: MovementEventActionType.RESET_STATE };

const initialState: MovementEventState = {
  isMovementCreated: false,
  movementType: undefined,
};

function reducer(
  state: MovementEventState,
  action: MovementEventAction
): MovementEventState {
  switch (action.type) {
    case MovementEventActionType.MOVEMENT_CREATED:
      return { isMovementCreated: true, movementType: action.payload };

    case MovementEventActionType.MOVEMENT_DELETED:
      return { isMovementCreated: false, movementType: undefined };

    case MovementEventActionType.RESET_STATE:
      return { isMovementCreated: false, movementType: undefined };

    default:
      return state;
  }
}

export function MovementEventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, movementEventDispatch] = React.useReducer(
    reducer,
    initialState
  );

  return (
    <MovementEventStateContext.Provider
      value={{
        state,
        movementEventDispatch,
      }}
    >
      {children}
    </MovementEventStateContext.Provider>
  );
}
