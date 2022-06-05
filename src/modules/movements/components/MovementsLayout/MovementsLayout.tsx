import Link from "next/link";
import { movementsRoutes } from "src/modules/shared/routes/web";
import { MovementRegisterForm } from "../../containers/MovementRegisterForm";
import { useNodeMovementsRepository } from "../../service/useNodeMovements.repository";

import styles from "./MovementsLayout.module.scss";

type MovementsLayoutProps = {
  children?: React.ReactNode;
};

export const MovementsLayout: React.FC<MovementsLayoutProps> = ({
  children,
}) => {
  const movementsRepository = useNodeMovementsRepository();

  return (
    <>
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
    </>
  );
};
