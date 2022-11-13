import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from './Product';
import { perPage } from '../config';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(skip: $skip, first: $first) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Products = ({ page }) => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <h2>Loading...</h2>;
  if (error) {
    return <p>{`Error: ${error.message}`}</p>;
  }
  if (data)
    return (
      <ProductListStyled>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductListStyled>
    );
};

Products.propTypes = {
  page: PropTypes.number,
};

export { ALL_PRODUCTS_QUERY };
export default Products;
