import { useState } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';
import classNames from 'classnames';

import styles from './Pagination.module.scss';
import { usePagination } from './usePagination';

type PaginationProps = {
  offset: number;
  limit: number;
  total: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({
  offset,
  limit,
  total,
  setOffset,
}) => {
  const [currentPage, setCurrent] = useState(1);
  const totalPages = Math.ceil(total / limit);

  const paginationRange = usePagination({
    currentPage,
    totalPages,
  });

  const nextHandle = () => {
    setOffset(offset + limit);
    setCurrent((prev) => (prev + 1 < totalPages ? prev + 1 : totalPages));
  };

  const prevHandle = () => {
    setOffset(offset - limit);
    setCurrent((prev) => (prev - 1 > 1 ? prev - 1 : 1));
  };

  const onPageChange = (pageNumber: number) => {
    setOffset(limit * pageNumber);
    setCurrent(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <div
        className={classNames(styles.prev, {
          [styles.prev_disabled]: currentPage === 1,
        })}
        onClick={prevHandle}
      >
        <img src={prev} alt="prev" />
      </div>

      <div className={styles.pages}>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === 0) {
            return <li className={styles.dots}>...</li>;
          }

          return (
            <li
              className={classNames(styles.page, {
                [styles.page_selected]: pageNumber === currentPage,
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
          [styles.next_disabled]: currentPage === totalPages,
        })}
        onClick={nextHandle}
      >
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
