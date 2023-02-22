import React, { useState } from 'react';

import filter from '@assets/images/filter.svg';
import classNames from 'classnames';

import styles from './Filter.module.scss';
import { Category } from '../Products';

type FilterProps = {
  categories: Category[];
  selectedCategory: Category | null;
  onClick: React.Dispatch<React.SetStateAction<Category | null>>;
};

const Filter: React.FC<FilterProps> = ({
  categories,
  selectedCategory,
  onClick,
}) => {
  const [optionsIsVisible, setOptionsIsVisible] = useState(false);

  const selectOnClickHandler = () => {
    setOptionsIsVisible((prev) => !prev);
  };

  const optionOnClickHandler = (category: Category) => {
    onClick(category);
    selectOnClickHandler();
  };

  const options = categories.map((category) => {
    const isSelected = selectedCategory?.id === category.id;

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
