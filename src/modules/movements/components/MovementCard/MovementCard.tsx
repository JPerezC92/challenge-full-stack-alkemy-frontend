import { useRouter } from "next/router";
import { MovementEndpoint } from "src/modules/movements/dto/MovementEndpoint";

import styles from "./MovementCard.module.scss";

type MovementCardProps = MovementEndpoint;

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
