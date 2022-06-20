import React from "react";
import { FAILED_TO_FETCH } from "src/modules/shared/utils/constants";
import { useLoading } from "./useLoading";

export const useRequest = (
  fn: (props: { abortController: AbortController }) => Promise<void>,
  deps: React.DependencyList
) => {
  const { isLoading, finishLoading, startLoading } = useLoading(true);
  const abortControllerRef = React.useRef<AbortController>();

  React.useEffect(() => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        startLoading();

        await fn({ abortController });

        finishLoading();
      } catch (error) {
        if (error instanceof TypeError && error.message === FAILED_TO_FETCH) {
          return console.log(error.message);
        }

        if ((error as DOMException).code !== DOMException.ABORT_ERR) {
          throw error;
        }
      } finally {
        finishLoading();
      }
    })();

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishLoading, startLoading, ...deps]);

  return { isLoading };
};
