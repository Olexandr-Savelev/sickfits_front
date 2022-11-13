import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';

const SignInPageWrapperStetyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 900px) {
    display: block;
  }
`;

const SignInPage = () => (
  <SignInPageWrapperStetyles>
    <SignIn />
    <RequestReset />
  </SignInPageWrapperStetyles>
);

export default SignInPage;
