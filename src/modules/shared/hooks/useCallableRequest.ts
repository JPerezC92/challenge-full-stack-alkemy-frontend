import React from "react";
import { useLoading } from "./useLoading";

export const useCallableRequest = <Input>(
  fn: (props: {
    abortController: AbortController;
  }) => Promise<(input: Input) => Promise<void>>,
  deps: unknown[] | undefined = []
) => {
  const { isLoading, finishLoading, startLoading } = useLoading();
  const abortControllerRef = React.useRef<AbortController>();

  const execute: Awaited<ReturnType<typeof fn>> = React.useCallback(
    async (input) => {
      try {
        abortControllerRef.current?.abort();
        const abortController = new AbortController();

        abortControllerRef.current = abortController;

        startLoading();

        const fnResult = await fn({
          abortController: abortControllerRef.current,
        });

        await fnResult(input);
      } catch (error) {
        console.log({ error });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startLoading, ...deps]
  );

  React.useEffect(() => {
    return () => {
      finishLoading();
      abortControllerRef.current?.abort();
    };
  }, [finishLoading]);

  return { isLoading, execute };
};
