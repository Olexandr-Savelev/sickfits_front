import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useMenu } from '../../lib/menuState';
import SignOut from '../SignOut';
import { useUser } from '../User';

const MobileMenuStyles = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 4;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  a,
  button {
    font-size: 2rem;
    color: white;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const MobileMenu = () => {
  const { menuState, toggleMenu } = useMenu();
  const user = useUser();
  if (!menuState) return null;
  return (
    <MobileMenuStyles onClick={toggleMenu}>
      {user && (
        <>
          <Link href="/">Producs</Link>
          <Link href="/sell">Add Item</Link>
          {/* <Link href="/order">Order</Link>
          <Link href="/account">Account</Link> */}
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </MobileMenuStyles>
  );
};

export default MobileMenu;
