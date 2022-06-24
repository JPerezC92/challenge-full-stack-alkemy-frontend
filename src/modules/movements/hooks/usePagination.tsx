import React from "react";

export function usePagination() {
  const [pagesCount, setPagesCount] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const updatePagesCount = React.useCallback(
    (pagesCount: number) => setPagesCount(pagesCount),
    []
  );

  const updatePage = React.useCallback((page: number) => setPage(page), []);

  return {
    pages: Array(pagesCount)
      .fill("")
      .map((_, index) => index + 1),
    currentPage: page,
    updatePagesCount,
    updatePage,
  };
}
