import React from "react";
import { useLoading } from "./useLoading";

export const useRequest = (
  fn: (props: { abortController: AbortController }) => Promise<void>,
  deps: unknown[] | undefined = []
) => {
  const { isLoading, finishLoading, startLoading } = useLoading();

  React.useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        startLoading();

        await fn({ abortController });

        finishLoading();
      } catch (error) {
        if ((error as DOMException).code !== DOMException.ABORT_ERR) {
          throw error;
        }
      }
    })();

    return () => {
      finishLoading();
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { isLoading: isLoading };
};
