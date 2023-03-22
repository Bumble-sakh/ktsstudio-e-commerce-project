import { FC } from 'react';

import minus from '@assets/images/minus.svg';
import plus from '@assets/images/plus.svg';
import Button from '@components/Button';
import { ProductModel } from '@store/models/product';
import rootStore from '@store/RootStore/instance';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './ProductCard.module.scss';

type ProductCardProps = {
  product: ProductModel;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.card__image}
        src={product.images[0]}
        alt={product.title}
      />
      <div className={styles.content}>
        <p className={styles.content__title}>{product.title}</p>
        <p className={styles.content__description}>{product.description}</p>
      </div>

      <p className={styles.card__price}>{`$${product.price}`}</p>
      <div className={styles.card__buttons}>
        <Button
          className={classNames({
            [styles.card__button]: true,
            [styles.card__button_disable]: rootStore.buyNowStore.amount < 2,
          })}
          onClick={rootStore.buyNowStore.decrementAmount}
        >
          <img src={minus} alt="minus" />
        </Button>
        <p className={styles.card__amount}>{rootStore.buyNowStore.amount}</p>
        <Button
          className={styles.card__button}
          onClick={rootStore.buyNowStore.incrementAmount}
        >
          <img src={plus} alt="plus" />
        </Button>
      </div>
    </div>
  );
};

export default observer(ProductCard);
