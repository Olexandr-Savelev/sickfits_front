import { gql, useQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { useRouter } from 'next/dist/client/router';
import { ALL_PRODUCTS_QUERY } from './Products';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const GET_SINGLE_PRODUCT = gql`
  query GET_SINGLE_PRODUCT($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
    }
  }
`;

const PRODUCT_UPDATE_MUTATION = gql`
  mutation PRODUCT_UPDATE_MUTATION(
    $id: ID!
    $name: String!
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: { id },
  });
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  const [
    updateProduct,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(PRODUCT_UPDATE_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
      },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });
    router.back();
  };
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <DisplayError error={error || updateError} />
      <Form onSubmit={handleSubmit}>
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type="submit">Update Product</button>
      </Form>
    </>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string,
};

export default UpdateProduct;
