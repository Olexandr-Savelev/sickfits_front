import { object } from 'prop-types';
import styled from 'styled-components';

import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import Supreme from './styles/Supreme';

import formatMoney from '../lib/formatMoney';
import countTotalPrice from '../lib/countTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  img {
    margin-right: 1rem;
    object-fit: cover;
    width: 100px;
  }
  h3,
  p {
    margin: 0;
    padding: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)} ={' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartItemStyles>
  );
};

const Cart = () => {
  const me = useUser();
  const { cartState, toggleCart } = useCart();
  if (!me) return null;
  return (
    <CartStyles open={cartState}>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
        <button type="button" onClick={toggleCart}>
          &times;
        </button>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <h3>Total: {formatMoney(countTotalPrice(me.cart))}</h3>
      </footer>
    </CartStyles>
  );
};

CartItem.propTypes = {
  cartItem: object,
};

export default Cart;
