import rootStore from '@store/RootStore/instance';
import { observer } from 'mobx-react-lite';

import styles from './Cart.module.scss';
import ProductCard from './ProductCard';
import Total from './Total';

const Cart = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.cart}>
          <div className={styles.cards}>
            {rootStore.cartStore.order.map((id) => (
              <ProductCard
                key={id}
                product={rootStore.cartStore.entities[id].product}
              />
            ))}
          </div>

          <Total />
        </div>
      </div>
    </section>
  );
};

export default observer(Cart);
