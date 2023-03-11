import { useEffect, useMemo } from 'react';

import Card from '@components/Card';
import Loader, { LoaderSize } from '@components/Loader';
import PaginationStore from '@store/PaginationStore';
import ProductsStore from '@store/ProductsStore';
import { useQueryParamsStoreInit } from '@store/RootStore/hooks';
import rootStore from '@store/RootStore/instance';
import { Meta } from '@utils/Meta';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';

import Filter from './Filter';
import Pagination from './Pagination';
import styles from './Products.module.scss';
import Search from './Search';

const Products = () => {
  useQueryParamsStoreInit();

  const productsStore = useLocalStore(() => new ProductsStore());
  const paginationStore = useLocalStore(() => new PaginationStore());

  const totalPages = useMemo(
    () => Math.ceil(productsStore.totalProducts / paginationStore.limit),
    [productsStore.totalProducts, paginationStore.limit]
  );

  useEffect(() => {
    const search = rootStore.queryParamsStore.getParam('search') ?? null;
    const categoryId =
      rootStore.queryParamsStore.getParam('categoryId') ?? null;
    productsStore.getProducts({ categoryId, search });

    const page = rootStore.queryParamsStore.getParam('page') ?? 1;
    paginationStore.setPaginationPage(+page);
  }, [productsStore, paginationStore]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>

        <div className={styles.bar}>
          <Search />
          <Filter />
        </div>

        {productsStore.meta === Meta.loading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <>
            <h2 className={styles.total}>
              Total Product
              <span className={styles.total__count}>
                {productsStore.totalProducts}
              </span>
            </h2>

            <ul className={styles.cards}>
              {productsStore.products
                .slice(
                  paginationStore.offset,
                  paginationStore.offset + paginationStore.limit
                )
                .map((product) => (
                  <Card key={product.id} product={product} />
                ))}
            </ul>

            {productsStore.products.length > paginationStore.limit && (
              <Pagination totalPages={totalPages} />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default observer(Products);
