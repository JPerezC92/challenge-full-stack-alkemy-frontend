import { useRouter } from "next/router";
import React from "react";

import styles from "./Redirect.module.scss";

type RedirectProps = {
  to: string;
  replace?: boolean;
};

export const Redirect: React.FC<RedirectProps> = ({ to, replace }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (replace) router.replace(to);

    if (!replace) router.push(to);
  }, [to, router, replace]);

  return (
    <span role="alert" aria-busy="true">
      ...Loading
    </span>
  );
};
