import React from 'react';

import ROUTES from '@config/routes';
import { Product } from '@pages/Products';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';

export type CardProps = {
  product: Product;
};

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <li className={styles.card}>
      <Link to={`${ROUTES.product}/${product.id}`}>
        <img
          src={product.images[0]}
          alt="Product"
          className={styles.card__image}
        />
        {product.category ? (
          <div className={styles.card__category}>{product.category.name}</div>
        ) : null}
        <div className={styles.card__title}>{product.title}</div>
        <div className={styles.card__subtitle}>{product.description}</div>
        <div className={styles.card__content}>{`$${product.price}`}</div>
      </Link>
    </li>
  );
};

export default Card;
