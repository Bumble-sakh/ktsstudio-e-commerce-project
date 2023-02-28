import { useCallback } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';
import PAGINATION from '@config/pagination';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination';

type PaginationProps = {
  totalPages: number;
  paginationPage: number;
  setPaginationPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  paginationPage,
  setPaginationPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationRange = usePagination({
    currentPage: paginationPage,
    totalPages,
  });

  const nextHandle = useCallback(() => {
    const page =
      paginationPage + 1 < totalPages ? paginationPage + 1 : totalPages;

    setPaginationPage(page);
    if (page > 1) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [
    paginationPage,
    searchParams,
    setPaginationPage,
    setSearchParams,
    totalPages,
  ]);

  const prevHandle = useCallback(() => {
    const page = paginationPage - 1 > 1 ? paginationPage - 1 : 1;

    setPaginationPage(page);
    if (page > 1) {
      searchParams.set('page', String(page));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [paginationPage, searchParams, setPaginationPage, setSearchParams]);

  const onPageChange = useCallback(
    (page: number) => {
      setPaginationPage(page);

      if (page > 1) {
        searchParams.set('page', String(page));
        setSearchParams(searchParams);
      } else {
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
    },
    [searchParams, setPaginationPage, setSearchParams]
  );

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.prev, {
          [styles.prev_disabled]: paginationPage === 1,
        })}
        onClick={prevHandle}
      >
        <img src={prev} alt="prev" />
      </div>

      <div className={styles.pages}>
        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === PAGINATION.dots) {
            return (
              <li key={idx} className={styles.dots}>
                ...
              </li>
            );
          }

          return (
            <li
              key={idx}
              className={classNames(styles.page, {
                [styles.page_selected]: pageNumber === paginationPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>

      <div
        className={classNames(styles.next, {
          [styles.next_disabled]: paginationPage === totalPages,
        })}
        onClick={nextHandle}
      >
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
