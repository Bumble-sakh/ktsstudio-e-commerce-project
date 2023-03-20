import cart from '@assets/images/cart.svg';
import user from '@assets/images/user.svg';
import rootStore from '@store/RootStore/instance';
import { observer } from 'mobx-react-lite';

import styles from './User.module.scss';

const User = () => {
  return (
    <div className={styles.user}>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <img src={cart} alt="cart" />
          <div>{rootStore.cartStore.productsAmount}</div>
        </li>
        <li className={styles.list__item}>
          <img src={user} alt="user" />
        </li>
      </ul>
    </div>
  );
};

export default observer(User);
