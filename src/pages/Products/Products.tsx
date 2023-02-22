import { useEffect, useState } from 'react';

import Card from '@components/Card';
import PAGINATION from '@config/pagination';
import ROUTES from '@config/routes';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Filter from './Filter';
import Pagination from './Pagination';
import styles from './Products.module.scss';
import Search from './Search';

export type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [searchProperty, setSearchProperty] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = PAGINATION.limit;

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: '/products',
        params: {
          categoryId: category ? category.id : null,
          title: searchProperty ? searchProperty : null,
        },
      });

      setProducts(result.data);
    };

    fetch();
  }, [category, searchProperty]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: '/categories',
      });

      setCategories(result.data);
    };

    fetch();
  }, []);

  return (
    <section className={styles.section}>
      <div className={`${styles.section__wrapper} wrapper`}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </p>

        <div className={styles.bar}>
          <Search onChange={setSearchProperty} />
          <Filter
            categories={categories}
            selectedCategory={category}
            onClick={setCategory}
          />
        </div>

        <h2 className={styles.total}>
          Total Product
          <span className={styles.total__count}>{products.length}</span>
        </h2>

        <ul className={styles.cards}>
          {products.slice(offset, offset + limit).map((product) => (
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

        <Pagination
          offset={offset}
          limit={limit}
          setOffset={setOffset}
          total={products.length}
        />
      </div>
    </section>
  );
};

export default Products;
