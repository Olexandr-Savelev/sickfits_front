import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const RemoveButtonStyles = styled.button`
  background-color: transparent;
  border: 1px solid var(--lightGrey);
  padding: 0.3rem 0.5rem;
  box-shadow: var(--bs-btn);
  font-size: 1rem;
  transition: box-shadow 0.3s;
  &:hover {
    cursor: pointer;
    box-shadow: none;
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

const RemoveFromCart = ({ id }) => {
  const [deleteCartItem, { loading }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    variables: { id },
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    update,
  });
  return (
    <RemoveButtonStyles
      disabled={loading}
      type="button"
      onClick={deleteCartItem}
    >
      Remove
    </RemoveButtonStyles>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
