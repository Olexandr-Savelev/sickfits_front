import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Form from './styles/Form';
import { useForm } from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';
import { SIGN_IN_MUTATION } from './SignIn';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $password: String!
    $email: String!
  ) {
    createUser(data: { name: $name, password: $password, email: $email }) {
      id
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    },
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup();
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };
  if (data) {
    router.push('/signin');
  }

  return (
    <>
      <DisplayError error={error} />
      <Form method="POST" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Sign Up For an Account</h2>
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="name">
            Your Name
            <input
              required
              type="text"
              autoComplete="name"
              name="name"
              placeholder="Your Name"
              value={inputs.name}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="email">
            Your Email
            <input
              required
              type="email"
              autoComplete="email"
              name="email"
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
              placeholder="Your Password"
              value={inputs.password}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button type="submit">Sign Up</button>
        </fieldset>
      </Form>
    </>
  );
};

export default SignUp;
