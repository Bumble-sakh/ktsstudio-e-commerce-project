import Header from '@components/Layout/Header';
import { useQueryParamsStoreInit } from '@store/RootStore/hooks';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
