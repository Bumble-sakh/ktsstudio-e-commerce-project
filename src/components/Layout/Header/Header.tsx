import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <div>Logo</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
      <div>
        <ul>
          <li>Cart</li>
          <li>User</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
