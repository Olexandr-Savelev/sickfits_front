import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';
import ProductButton from './styles/ProductButton';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <ProductButton disabled={loading} type="button" onClick={addToCart}>
      Add{loading && 'ing'} To Cart
    </ProductButton>
  );
};

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddToCart;
