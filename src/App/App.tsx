import React from 'react';

import Header from '@components/Header';
import About from '@pages/About';
import Categories from '@pages/Categories';
import Product from '@pages/Product';
import Products from '@pages/Products';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import styles from './App.module.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
