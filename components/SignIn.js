import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
  });

  const router = useRouter();

  const [signin, { data, loading }] = useMutation(SIGN_IN_MUTATION, {
    variables: { email: inputs.email, password: inputs.password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin();
    resetForm();
  };
  if (
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordSuccess'
  ) {
    router.push('/');
  }
  return (
    <>
      <DisplayError
        error={{ message: data?.authenticateUserWithPassword?.message }}
      />
      <Form method="POST" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Sign Into Your Account</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="email">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={inputs.email}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              required
              type="password"
              autoComplete="password"
              name="password"
              id="password"
              placeholder="Your Password"
              value={inputs.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    </>
  );
};

export { SIGN_IN_MUTATION };
export default SignIn;
