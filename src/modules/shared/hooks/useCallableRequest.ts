import React from "react";
import { useLoading } from "./useLoading";

export const useCallableRequest = <Input = void>(
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

        const fnResult = await fn({ abortController });

        await fnResult(input);
      } catch (error) {
        finishLoading();
        console.log({ error });
      } finally {
        finishLoading();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [finishLoading, startLoading, ...deps]
  );

  React.useEffect(() => {
    return () => {
      finishLoading();
      abortControllerRef.current?.abort();
    };
  }, [finishLoading]);

  return { isLoading, execute };
};
