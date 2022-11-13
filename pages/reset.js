import { useRouter } from 'next/dist/client/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from '../components/styles/Form';
import { useForm } from '../lib/useForm';
import DisplayError from '../components/ErrorMessage';

const REDEEM_USER_PASSWORD_RESET_TOKEN_MUTATION = gql`
  mutation REDEEM_USER_PASSWORD_RESET_TOKEN_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    REDEEM_USER_PASSWORD_RESET_TOKEN_MUTATION,
    { variables: inputs }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword();
    } catch (error) {
      console.log(error);
    }
  };

  if (!token) {
    return <h2>Token not provided!</h2>;
  }
  return (
    <>
      <DisplayError error={data?.redeemUserPasswordResetToken || error} />
      <Form method="POST" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
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
          {data?.redeemUserPasswordResetToken === null && (
            <p>Success! Now you can sign in!</p>
          )}
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
    </>
  );
};

export default ResetPasswordPage;
