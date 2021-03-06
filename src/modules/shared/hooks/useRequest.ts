import React from "react";
import { isDevelopment } from "src/modules/shared/utils/environment";

export const useRequest = (
  fn: (props: { abortController: AbortController }) => Promise<void>,
  deps: React.DependencyList
) => {
  const abortControllerRef = React.useRef<AbortController>();

  React.useEffect(() => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        await fn({ abortController });
      } catch (error) {
        isDevelopment() && console.log({ error });
      }
    })();

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
