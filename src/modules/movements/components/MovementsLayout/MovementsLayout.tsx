import React from "react";
import { MovementEventProvider } from "src/modules/movements/context/MovementEventProvider.context";

type MovementsLayoutProps = {
  children?: React.ReactNode;
};

export const MovementsLayout: React.FC<MovementsLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <MovementEventProvider>{children}</MovementEventProvider>
    </>
  );
};
