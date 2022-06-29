import React from "react";

export function useToggle() {
  const [isActive, setIsActive] = React.useState(false);

  const toggle = React.useCallback(() => setIsActive((s) => !s), []);

  return [isActive, toggle] as const;
}
