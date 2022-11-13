import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartDot from './CartDot';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  const { toggleCart } = useCart();

  return (
    <>
      <NavStyles>
        <Link href="/products">Products</Link>
        {user && (
          <>
            <Link href="/sell">Add Item</Link>
            {/* <Link href="/order">Order</Link>
          <Link href="/account">Account</Link> */}
            <SignOut />
            <button type="button" onClick={toggleCart}>
              Cart
              <CartDot
                count={user.cart.reduce(
                  (acc, cartItem) => acc + cartItem.quantity,
                  0
                )}
              />
            </button>
          </>
        )}
        {!user && (
          <>
            <Link href="/signin">Sign In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </NavStyles>
    </>
  );
};

export default Nav;
