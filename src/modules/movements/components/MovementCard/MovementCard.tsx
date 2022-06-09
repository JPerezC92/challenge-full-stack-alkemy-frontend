import { useRouter } from "next/router";
import { MovementView } from "src/modules/movements/dto/MovementView";

import styles from "./MovementCard.module.scss";

type MovementCardProps = MovementView;

export const MovementCard: React.FC<MovementCardProps> = ({
  id,
  amount,
  concept,
  type,
}) => {
  const router = useRouter();

  const handleEdit = () => router.push({ query: { id } });

  return (
    <article>
      <p>{id}</p>
      <p>{amount}</p>
      <p>{concept}</p>
      <p>{type}</p>

      <button type="button" onClick={handleEdit}>
        Edit
      </button>
    </article>
  );
};
