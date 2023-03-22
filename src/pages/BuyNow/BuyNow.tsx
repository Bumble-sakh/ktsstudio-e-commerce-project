import { useEffect } from 'react';

import Loader, { LoaderSize } from '@components/Loader';
import rootStore from '@store/RootStore/instance';
import { Meta } from '@utils/Meta';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import styles from './BuyNow.module.scss';
import ProductCard from './ProductCard';
import Total from './Total';

const BuyNow = () => {
  const { id } = useParams();

  useEffect(() => {
    id && rootStore.buyNowStore.getProduct(id);
  }, [id]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.title}>Buy now</h1>
        {rootStore.buyNowStore.meta === Meta.loading && (
          <Loader size={LoaderSize.l} />
        )}

        {rootStore.buyNowStore.product && (
          <ProductCard product={rootStore.buyNowStore.product} />
        )}
        {rootStore.buyNowStore.product && <Total />}
      </div>
    </section>
  );
};

export default observer(BuyNow);
