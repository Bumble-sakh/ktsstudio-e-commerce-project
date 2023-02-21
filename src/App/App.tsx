import React from 'react';

import Layout from '@components/Layout';
import About from '@pages/About';
import Categories from '@pages/Categories';
import Product from '@pages/Product';
import Products from '@pages/Products';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route index element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
