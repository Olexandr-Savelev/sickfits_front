import { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const LocalState = createContext();
const LocalStateProvider = LocalState.Provider;

function CartStateProvider({ children }) {
  const [cartState, setCartState] = useState(false);

  function toggleCart() {
    setCartState(!cartState);
  }

  return (
    <LocalStateProvider value={{ cartState, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalState);
  return all;
}

CartStateProvider.propTypes = {
  children: node,
};

export { CartStateProvider, useCart };
