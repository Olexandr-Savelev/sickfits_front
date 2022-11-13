import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from './ErrorMessage';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
  });

  const [getToken, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getToken().catch((err) => console.log(err));
  };

  return (
    <>
      <DisplayError error={error} />
      <Form method="POST" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Request Reset Password</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="email">
            Your Email
            <input
              required
              type="email"
              autoComplete="email"
              name="email"
              placeholder="Your Email"
              value={inputs.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
          {data?.sendUserPasswordResetLink === null && (
            <p>Success! Check your email for the link!</p>
          )}
          <button type="submit">Request Reset</button>
        </fieldset>
      </Form>
    </>
  );
};

export default RequestReset;
