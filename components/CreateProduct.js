import gql from 'graphql-tag';

import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { useForm } from '../lib/useForm';

import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { PRODUCT_COUNT_QUERY } from './Pagination';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      status
      price
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm();
  const router = useRouter();

  const [createProduct, { loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        { query: PRODUCT_COUNT_QUERY },
        { query: ALL_PRODUCTS_QUERY },
      ],
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct();
    clearForm();
    router.push(`/`);
  };

  return (
    <>
      <DisplayError error={error} />
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="image">
            Image
            <input
              required
              type="file"
              name="image"
              id="image"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={inputs.name}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              required
              type="number"
              name="price"
              id="price"
              value={inputs.price}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={inputs.description}
              onChange={(e) => handleChange(e)}
            />
          </label>
        </fieldset>
        <button type="submit">+ Add Product</button>
      </Form>
    </>
  );
};

export default CreateProduct;
