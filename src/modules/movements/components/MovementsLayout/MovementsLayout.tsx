import Link from "next/link";
import React from "react";
import { MovementRegisterForm } from "src/modules/movements/containers/MovementRegisterForm";
import { MovementCreatedEventProvider } from "src/modules/movements/context/MovementCreatedEvent.context";
import { useNodeMovementsRepository } from "src/modules/movements/service/useNodeMovements.repository";
import { movementsRoutes } from "src/modules/shared/routes/web";

type MovementsLayoutProps = {
  children?: React.ReactNode;
};

export const MovementsLayout: React.FC<MovementsLayoutProps> = ({
  children,
}) => {
  const movementsRepository = useNodeMovementsRepository();

  return (
    <>
      <MovementCreatedEventProvider>
        <br />
        <MovementRegisterForm movementsRepository={movementsRepository} />

        <nav
          style={{
            display: "flex",
            gap: "1rem",
            border: "1px solid black",
          }}
        >
          <Link href={movementsRoutes.income}>
            <a>Income</a>
          </Link>
          <Link href={movementsRoutes.expense}>
            <a>Expense</a>
          </Link>
        </nav>
        <br />

        {children}
      </MovementCreatedEventProvider>
    </>
  );
};
