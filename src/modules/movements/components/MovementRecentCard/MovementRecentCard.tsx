import React from "react";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";

import styles from "./MovementRecentCard.module.scss";

type MovementRecentCardProps = MovementEndpoint;

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
