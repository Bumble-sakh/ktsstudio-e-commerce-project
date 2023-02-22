import { useEffect, useState } from 'react';

import Button from '@components/Button';
import Card from '@components/Card';
import ROUTES from '@config/routes';
import { Product as ProductType } from '@pages/Products';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [related, setRelated] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: `/products/${id}`,
      });

      setProduct(result.data);
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
    };

    fetch();
  }, [product]);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <div className={styles.product}>
          <div className={styles.product__slider}>
            <img
              src={product?.images[0]}
              alt={product?.title}
              className={styles.product__image}
            ></img>
          </div>

          <div className={styles.product__content}>
            <div className={styles.product__title}>{product?.title}</div>
            <div className={styles.product__subtitle}>
              {product?.description}
            </div>
            <div className={styles.product__price}>{`$${product?.price}`}</div>
            <div className={styles.product__buttons}>
              <Button>Buy Now</Button>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>

        <h2 className={styles.title}>Related Items</h2>

        <ul className={styles.cards}>
          {related.map((product) => (
            <Link to={`${ROUTES.product}/${product.id}`} key={product.id}>
              <Card
                image={product.images[0]}
                title={product.title}
                subtitle={product.description}
                content={`$${product.price}`}
                category={product.category.name}
              />
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Product;
