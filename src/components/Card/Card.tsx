import React from 'react';

import styles from './Card.module.scss';

export type CardProps = {
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  category?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  category,
  content,
  onClick,
}) => {
  return (
    <li className={styles.card} onClick={onClick}>
      <img src={image} alt="Product" className={styles.card__image} />
      {category ? (
        <div className={styles.card__category}>{category}</div>
      ) : null}
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>{subtitle}</div>
      <div className={styles.card__content}>{content}</div>
    </li>
  );
};

export default Card;
