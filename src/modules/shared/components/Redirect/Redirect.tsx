import { useRouter } from "next/router";
import React from "react";
import { SpinnerFullScreen } from "src/modules/shared/components/SpinnerFullScreen";

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

  return <SpinnerFullScreen />;
};
