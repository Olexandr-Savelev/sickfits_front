import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  gap: 2rem;
  img {
    object-fit: cover;
    width: 50%;
  }
  .details {
    width: 50%;
    padding: 1rem;
    box-shadow: var(--bs);
  }
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      object-fit: cover;
      width: 100%;
    }
    .details {
      width: 100%;
    }
  }
`;

const BackButtonStyles = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2em;
  line-height: 80%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    scale: 0.9;
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });
  const router = useRouter();
  if (loading) return <h3>Loading...</h3>;
  if (error) return <DisplayError />;
  const { Product } = data;
  return (
    <>
      <ProductStyles>
        <Head>
          <title>Sick Fits | {Product.name} </title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <img
          src={Product.photo.image.publicUrlTransformed}
          alt={Product.photo.altText}
        />
        <div className="details">
          <h2>{Product.name}</h2>
          <p>{Product.description}</p>
          <strong>Price: </strong>
          {formatMoney(Product.price)}
        </div>
      </ProductStyles>
      <BackButtonStyles
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        &#8678;
      </BackButtonStyles>
    </>
  );
};

SingleProduct.propTypes = {
  id: PropTypes.string,
};

export default SingleProduct;
