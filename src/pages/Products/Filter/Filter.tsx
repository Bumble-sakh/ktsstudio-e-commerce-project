import React, { useState } from 'react';

import filter from '@assets/images/filter.svg';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from './Filter.module.scss';
import { Category } from '../Products';

type FilterProps = {
  categories: Category[];
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  setPaginationPage: React.Dispatch<React.SetStateAction<number>>;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  categoryId,
  setCategoryId,
  setPaginationPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [optionsIsVisible, setOptionsIsVisible] = useState(false);

  const selectOnClickHandler = () => {
    setOptionsIsVisible((prev) => !prev);
  };

  const optionOnClickHandler = (category: Category) => {
    setCategoryId(category.id);

    if (category.id) {
      searchParams.set('categoryId', String(category.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete('categoryId');
      setSearchParams(searchParams);
    }

    setPaginationPage(1);
    searchParams.delete('page');
    setSearchParams(searchParams);

    selectOnClickHandler();
  };

  const options = categories.map((category) => {
    const isSelected = categoryId === category.id;

    const classes = classNames({
      [styles.list__item]: true,
      [styles.list__item_selected]: isSelected,
    });

    return (
      <li
        key={category.id}
        className={classes}
        onClick={() => optionOnClickHandler(category)}
      >
        {category.name}
      </li>
    );
  });

  return (
    <div className={styles.filter}>
      <div className={styles.filter__select} onClick={selectOnClickHandler}>
        <img src={filter} alt="filter" />
        Filter
      </div>
      {optionsIsVisible && (
        <div className={styles.filter__options}>
          <ul className={styles.list}>{options}</ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
