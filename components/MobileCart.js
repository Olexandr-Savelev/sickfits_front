import React from 'react';
import styled from 'styled-components';
import { useCart } from '../lib/cartState';
import Cart from '../public/static/icons/CartIcon.svg';
import CartDot from './CartDot';
import { useUser } from './User';

const CartWrapper = styled.div`
  display: flex;
`;

const MobileCart = () => {
  const user = useUser();
  const { toggleCart } = useCart();
  return (
    <CartWrapper onClick={toggleCart}>
      <Cart height={30} width={30} />
      {user?.cart ? (
        <CartDot
          count={user.cart.reduce(
            (acc, cartItem) => acc + cartItem.quantity,
            0
          )}
        />
      ) : null}
    </CartWrapper>
  );
};

export default MobileCart;
