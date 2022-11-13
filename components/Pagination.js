import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PRODUCT_COUNT_QUERY = gql`
  query PRODUCT_COUNT_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PRODUCT_COUNT_QUERY);

  if (loading) return null;
  if (error) return <DisplayError />;
  const { count } = data._allProductsMeta;
  const totalPages = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>&#129120; Prev</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <p>{count} Total Items</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= totalPages}>Next &#129122;</a>
      </Link>
    </PaginationStyles>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
};

export { PRODUCT_COUNT_QUERY };
export default Pagination;
