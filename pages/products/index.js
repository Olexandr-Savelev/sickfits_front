import { useRouter } from 'next/router';
import React from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
  const router = useRouter();
  const page = parseInt(router.query.page);
  return (
    <>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </>
  );
};
export default ProductsPage;
