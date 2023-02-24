import React, { useState } from 'react';

import search from '@assets/images/search.svg';
import Button from '@components/Button';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';

export type SearchProps = {
  onChange: (value: string) => void;
  setPaginationPage: React.Dispatch<React.SetStateAction<number>>;
};

const Search: React.FC<SearchProps> = ({ onChange, setPaginationPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(searchParams.get('title') ?? '');

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (value) {
      searchParams.set('title', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('title');
      setSearchParams(searchParams);
    }

    setPaginationPage(1);
    searchParams.delete('page');
    setSearchParams(searchParams);

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
