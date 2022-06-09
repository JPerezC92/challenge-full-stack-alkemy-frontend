import React from "react";
import { MovementView } from "src/modules/movements/dto/MovementView";

import styles from "./MovementRecentCard.module.scss";

type MovementRecentCardProps = MovementView;

export const MovementRecentCard: React.FC<MovementRecentCardProps> = ({
  amount,
  concept,
  type,
}) => {
  return (
    <li>
      MovementRecentCard
      <p>{amount}</p>
      <p>{concept}</p>
      <p>{type}</p>
    </li>
  );
};
