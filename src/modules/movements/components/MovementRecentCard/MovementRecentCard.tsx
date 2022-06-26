import React from "react";
import { MovementView } from "src/modules/movements/dto/MovementView";
import { MovementType } from "src/modules/movements/models/MovementType";

type MovementRecentCardProps = MovementView & {
  className?: string;
};

export const MovementRecentCard: React.FC<MovementRecentCardProps> = ({
  amount,
  concept,
  type,
  date,
  className,
}) => {
  const isExpense = type.toLowerCase() !== MovementType.INCOME.toLowerCase();

  return (
    <li
      className={`flex min-w-max flex-col gap-1 rounded-sm border border-cyan-500/30 p-3 ${className}`}
    >
      <header>
        <span className="text-lg font-bold capitalize">{concept}</span>
      </header>

      <div className=" flex items-center justify-between gap-4 text-right text-lg">
        <span className="min-w-max text-sm font-semibold italic text-gray-400">
          {date}
        </span>
        <span
          className={`${
            isExpense ? "text-orange-600" : "text-emerald-400"
          } min-w-max`}
        >
          <b>
            {isExpense ? "-" : "+"} ${amount}
          </b>
        </span>
      </div>
    </li>
  );
};
