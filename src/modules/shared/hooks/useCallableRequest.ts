import React from "react";
import { isDevelopment } from "src/modules/shared/utils/environment";

export const useCallableRequest = <Input extends unknown[]>(
  fn: (props: {
    abortController: AbortController;
  }) => Promise<(...args: Input) => Promise<void>>,
  deps: unknown[] | undefined = []
) => {
  const abortControllerRef = React.useRef<AbortController>();

  const execute: Awaited<ReturnType<typeof fn>> = React.useCallback(
    async (...input) => {
      abortControllerRef.current?.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const fnResult = await fn({ abortController });

        await fnResult(...input);
      } catch (error) {
        isDevelopment() && console.log({ error });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  React.useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return [execute] as const;
};
