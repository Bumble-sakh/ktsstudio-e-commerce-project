import React, { FC } from 'react';

import ROUTES from '@config/routes';
import { CategoryModel } from '@store/models/category';
import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

export type CategoryCardType = {
  category: CategoryModel;
};

const CategoryCard: FC<CategoryCardType> = ({ category }) => {
  return (
    <li className={styles.card}>
      <Link to={`${ROUTES.index}?categoryId=${category.id}`}>
        <div className={styles['card__image-wrapper']}>
          <img
            src={category.image}
            alt={category.name}
            className={styles.card__image}
          />
        </div>

        <div className={styles.card__title}>{category.name}</div>
      </Link>
    </li>
  );
};

export default React.memo(CategoryCard);
