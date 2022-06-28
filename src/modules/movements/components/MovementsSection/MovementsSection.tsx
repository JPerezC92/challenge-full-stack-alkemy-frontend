import React from "react";
import { MdFilterList } from "react-icons/md";
import { MovementsCollection } from "src/modules/movements/containers/MovementsCollection";
import { MovementType } from "src/modules/movements/models/MovementType";
import { MovementsRepository } from "src/modules/movements/service/MovementsRepository";
import { Label } from "src/modules/shared/components/Label";
import { Select } from "src/modules/shared/components/Select";
import { MyRepository } from "src/modules/shared/service/MyRepository";

type MovementsSectionProps = {
  className?: string;
  movementsRepository: MyRepository<MovementsRepository>;
};

export const MovementsSection: React.FC<MovementsSectionProps> = ({
  className,
  movementsRepository,
}) => {
  const [movementType, setMovementType] = React.useState(MovementType.INCOME);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
    setMovementType(e.target.value as MovementType);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-center">
        <h2 className="text-lg font-bold">Movements</h2>

        <div className="ml-auto flex items-center gap-2">
          <Label>
            <i>
              <MdFilterList></MdFilterList>
            </i>
          </Label>
          <Select
            className="px-2 capitalize"
            onChange={handleOnChange}
            value={movementType}
          >
            {Object.values(MovementType).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <hr className="my-4" />

      <MovementsCollection
        movementsRepository={movementsRepository}
        movementType={movementType}
      />
    </div>
  );
};
