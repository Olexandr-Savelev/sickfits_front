import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import MobileMenu from './styles/MobileMenu';
import { useMenu } from '../lib/menuState';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/public/static/radnikanext-medium-webfont.woff2');
  font-weight: normal;
  line-height: normal;
  font-size: 10px;
}
:root{
  --red:#ff0000;
  --black:#393939;
  --grey:#3a3a3a;
  --lightGrey:#adadad;
  --offWhite:#ededed;
  --maxWidth:1000px;
  --bs: 0 12px 24px 0 rgba(0,0,0,0.1);
  --bs-title: 5px 8px 12px 0 rgba(0,0,0,0.5);
  --bs-btn: 1px 3px 4px 0 rgba(0,0,0,0.5);
}
html{
  box-sizing:border-box;
}
*,*:before,*:after {
  box-sizing:inherit;
}
body{
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  font-size:1.4rem;
  line-height:1.4;
  ${(props) => (props.isMenuOpen ? 'height:100vh;overflow:hidden;' : null)}
}
a{
  text-decoration: none;
  color: var(--black);
}
a:hover{
  cursor: pointer;
}
button{
  font-family: 'radnika_next', -apple-system,BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',sans-serif;
}
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 500px) {
    padding: 0.5rem 2rem;
  }
  @media (max-width: 500px) {
    padding: 0.5rem 1rem;
  }
`;

const Page = ({ children }) => {
  const { menuState } = useMenu();
  return (
    <>
      <GlobalStyles isMenuOpen={menuState} />
      <Header />
      <MobileMenu />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Page;
