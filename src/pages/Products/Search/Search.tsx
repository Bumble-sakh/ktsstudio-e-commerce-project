import React, { useState } from 'react';

import search from '@assets/images/search.svg';
import Button from '@components/Button';

import styles from './Search.module.scss';

export type SearchProps = {
  onChange: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onChange }) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onChange(value);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <img src={search} alt="search" />
      <input
        type="search"
        className={styles.input}
        value={value}
        placeholder="Search property"
        onChange={onChangeHandler}
      />
      <Button type="submit">Find now</Button>
    </form>
  );
};

export default Search;
