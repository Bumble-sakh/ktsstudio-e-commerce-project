import logo from '@assets/images/logo.svg';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} ${styles.list__item_active}`}>
            <Link to="/" className={styles.navigation__link}>
              Products
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link to="/categories" className={styles.navigation__link}>
              Categories
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link to="/about" className={styles.navigation__link}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.user}>
        <ul className={styles.list}>
          <li className={styles.list__item}>Cart</li>
          <li className={styles.list__item}>User</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
