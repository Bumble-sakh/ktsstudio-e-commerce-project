import Header from '@components/Layout/Header';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
