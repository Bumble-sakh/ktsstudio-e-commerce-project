import { useEffect, useState } from 'react';

import Button from '@components/Button';
import Card from '@components/Card';
import Loader, { LoaderSize } from '@components/Loader';
import { Product as ProductType } from '@pages/Products';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import styles from './Product.module.scss';
import Slider from './Slider';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(true);
  const [relatedIsLoading, setRelatedIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: `/products/${id}`,
      });

      setProduct(result.data);
      setProductIsLoading(false);
    };

    fetch();
  }, [id]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: '/products',
        params: {
          categoryId: product?.category.id,
          offset: 0,
          limit: 6,
        },
      });
      setRelated(result.data);
      setRelatedIsLoading(false);
    };

    fetch();
  }, [product]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        {productIsLoading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <div className={styles.product}>
            {product && <Slider images={product.images} />}

            <div className={styles.product__content}>
              <div className={styles.product__title}>{product?.title}</div>
              <div className={styles.product__subtitle}>
                {product?.description}
              </div>
              <div
                className={styles.product__price}
              >{`$${product?.price}`}</div>
              <div className={styles.product__buttons}>
                <Button>Buy Now</Button>
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        )}

        <h2 className={styles.title}>Related Items</h2>

        {relatedIsLoading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <ul className={styles.cards}>
            {related.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Product;
