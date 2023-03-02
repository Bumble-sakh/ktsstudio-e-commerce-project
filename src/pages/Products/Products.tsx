import { useEffect, useMemo, useState } from 'react';

import Card from '@components/Card';
import Loader, { LoaderSize } from '@components/Loader';
import PAGINATION from '@config/pagination';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();

  const [productsIsLoading, setProductsIsLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(
    searchParams.get('categoryId')
      ? Number(searchParams.get('categoryId'))
      : null
  );
  const [searchProperty, setSearchProperty] = useState<string | null>(
    searchParams.get('title')
  );

  const limit = useMemo(() => PAGINATION.limit, []);
  const total = useMemo(() => products.length, [products.length]);
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const [paginationPage, setPaginationPage] = useState<number>(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const offset = useMemo(
    () => (paginationPage - 1) * limit,
    [paginationPage, limit]
  );

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: '/products',
        params: {
          categoryId: categoryId ? Number(categoryId) : null,
          title: searchProperty ? searchProperty : null,
        },
      });

      setProducts(result.data);
      setProductsIsLoading(false);
    };

    setProductsIsLoading(true);
    fetch();
  }, [categoryId, searchProperty]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        baseURL: 'https://api.escuelajs.co/api/v1',
        url: '/categories',
      });

      const categoryAll: Category = {
        id: 0,
        name: 'All',
        image: '',
      };
      setCategories([categoryAll, ...result.data]);
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
          <Search
            onChange={setSearchProperty}
            setPaginationPage={setPaginationPage}
          />
          <Filter
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            setPaginationPage={setPaginationPage}
          />
        </div>

        {productsIsLoading ? (
          <Loader size={LoaderSize.l} />
        ) : (
          <>
            <h2 className={styles.total}>
              Total Product
              <span className={styles.total__count}>{products.length}</span>
            </h2>

            <ul className={styles.cards}>
              {products.slice(offset, offset + limit).map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </ul>

            {products.length > limit && (
              <Pagination
                totalPages={totalPages}
                paginationPage={paginationPage}
                setPaginationPage={setPaginationPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
