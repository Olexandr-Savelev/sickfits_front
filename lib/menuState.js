import { node } from 'prop-types';
import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

function MenuContextProvider({ children }) {
  const [menuState, setMenuState] = useState(false);

  const toggleMenu = () => {
    console.log('MENU');
    setMenuState(!menuState);
  };

  return (
    <MenuContext.Provider value={{ menuState, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

MenuContextProvider.propTypes = {
  children: node,
};

function useMenu() {
  const menu = useContext(MenuContext);
  return menu;
}

export { useMenu, MenuContextProvider };
