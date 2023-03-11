import React, { useEffect, useState } from 'react';

import searchIcon from '@assets/images/search.svg';
import Button from '@components/Button';
import PaginationStore from '@store/PaginationStore';
import rootStore from '@store/RootStore/instance';
import { useLocalStore } from '@utils/useLocalStore';
import { useSearchParams } from 'react-router-dom';

import styles from './Search.module.scss';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationStore = useLocalStore(() => new PaginationStore());

  const [value, setValue] = useState('');

  useEffect(() => {
    const search = rootStore.queryParamsStore.getParam('search') ?? '';
    setValue(search);
  }, []);

  const onChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (value) {
      searchParams.set('search', value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }

    searchParams.delete('page');
    setSearchParams(searchParams);

    rootStore.queryParamsStore.setSearch(searchParams.toString());

    paginationStore.setDefaultPaginationPage();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <img src={searchIcon} alt="search" />
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
