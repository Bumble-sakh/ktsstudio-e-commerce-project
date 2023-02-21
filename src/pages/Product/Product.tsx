import { useParams } from 'react-router-dom';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();

  return (
    <section>
      <h1>Product title</h1>
      <p>Product subtitle</p>
      <p>Product id {id}</p>
    </section>
  );
};

export default Product;
