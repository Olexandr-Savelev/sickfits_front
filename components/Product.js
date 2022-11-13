import PropTypes from 'prop-types';

import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import Price from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import { useUser } from './User';
import AddToCart from './AddToCart';
import ProductButton from './styles/ProductButton';

const BtnBlockStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.4em;
  border-top: 1px solid var(--lightGrey);
  a {
    line-height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a:hover,
  button:hover {
    text-decoration: underline;
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const Product = ({ product }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id: product.id },
      update(cache, payload) {
        cache.evict(cache.identify(payload.data.deleteProduct));
      },
    }
  );

  const user = useUser();

  return (
    <Item>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <Price>{formatMoney(product.price)}</Price>
      <p>{product.description}</p>
      {user && (
        <BtnBlockStyles>
          <Link
            href={{
              pathname: '/update',
              query: {
                id: product.id,
              },
            }}
          >
            Edit
          </Link>
          <AddToCart id={product.id} />
          <ProductButton
            type="button"
            disabled={loading}
            onClick={() => {
              if (confirm('Are you sure?')) {
                deleteProduct().catch((error) => alert(error.message));
              }
            }}
          >
            Delete
          </ProductButton>
        </BtnBlockStyles>
      )}
    </Item>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.shape({
      id: PropTypes.string,
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
    }),
    price: PropTypes.number,
  }),
};

export default Product;
