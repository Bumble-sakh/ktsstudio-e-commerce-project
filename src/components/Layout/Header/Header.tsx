import cart from '@assets/images/cart.svg';
import logo from '@assets/images/logo.svg';
import user from '@assets/images/user.svg';
import ROUTES from '@config/routes';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__wrapper} wrapper`}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li className={`${styles.list__item}`}>
              <NavLink
                to={ROUTES.index}
                className={({ isActive }) =>
                  classNames({
                    [styles.navigation__link]: true,
                    [styles.navigation__link_active]: isActive,
                  })
                }
              >
                Products
              </NavLink>
            </li>

            <li className={styles.list__item}>
              <NavLink
                to={ROUTES.categories}
                className={({ isActive }) =>
                  classNames({
                    [styles.navigation__link]: true,
                    [styles.navigation__link_active]: isActive,
                  })
                }
              >
                Categories
              </NavLink>
            </li>

            <li className={styles.list__item}>
              <NavLink
                to={ROUTES.about}
                className={({ isActive }) =>
                  classNames({
                    [styles.navigation__link]: true,
                    [styles.navigation__link_active]: isActive,
                  })
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.user}>
          <ul className={styles.list}>
            <li className={styles.list__item}>
              <img src={cart} alt="cart" />
            </li>
            <li className={styles.list__item}>
              <img src={user} alt="user" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
