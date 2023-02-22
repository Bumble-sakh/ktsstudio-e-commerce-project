import { useState } from 'react';

import next from '@assets/images/next.svg';
import prev from '@assets/images/prev.svg';

import styles from './Pagination.module.scss';

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
  const [current, setCurrent] = useState(1);
  const totalPages = Math.ceil(total / limit);
  const middle = Math.ceil(totalPages / 2);

  const nextHandle = () => {
    setOffset(offset + limit);
    setCurrent((prev) => prev + 1);
  };

  const prevHandle = () => {
    setOffset(offset - limit);
    setCurrent((prev) => prev - 1);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.prev} onClick={prevHandle}>
        <img src={prev} alt="prev" />
      </div>

      <div className={styles.pages}>
        <div className={styles.page}>1</div>

        {current < middle && (
          <>
            <div className={styles.page}>{current + 1}</div>
            <div className={styles.page}>{current + 2}</div>{' '}
            <div className={styles.dots}>...</div>
          </>
        )}

        {current > middle && (
          <>
            <div className={styles.dots}>...</div>
            <div className={styles.page}>{current - 2}</div>
            <div className={styles.page}>{current - 1}</div>
          </>
        )}

        <div className={styles.page}>{totalPages}</div>
      </div>

      <div className={styles.next} onClick={nextHandle}>
        <img src={next} alt="next" />
      </div>
    </div>
  );
};

export default Pagination;
