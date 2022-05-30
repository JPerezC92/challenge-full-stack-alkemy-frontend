import React from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const finishLoading = React.useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    finishLoading,
  };
};
