import React from "react";

export const useLoading = (initialValue: boolean = false) => {
  const [isLoading, setIsLoading] = React.useState(initialValue);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const finishLoading = React.useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    finishLoading,
  };
};
