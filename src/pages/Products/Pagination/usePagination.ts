const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

type HookProps = {
  totalPages: number;
  currentPage: number;
};

export const usePagination = ({
  totalPages,
  currentPage,
}: HookProps): number[] => {
  const totalPageNumbers = 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage, 1);
  const rightSiblingIndex = Math.min(currentPage, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, 0, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3;
    let rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, 0, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, 0, ...middleRange, 0, lastPageIndex];
  }

  return [0];
};
