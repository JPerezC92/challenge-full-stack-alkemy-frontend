import React from "react";

export const useCallableRequest = <Input = unknown | undefined>(
  fn: (props: {
    abortController: AbortController;
  }) => Promise<(input: Input) => Promise<void>>,
  deps: unknown[] | undefined = []
) => {
  const abortControllerRef = React.useRef<AbortController>();

  const execute: Awaited<ReturnType<typeof fn>> = React.useCallback(
    async (input) => {
      abortControllerRef.current?.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const fnResult = await fn({ abortController });

        await fnResult(input);
      } catch (error) {
        console.log({ error });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return [execute] as const;
};
