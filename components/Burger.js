import styled from 'styled-components';
import { useMenu } from '../lib/menuState';

const BurgerStyles = styled.div`
  display: flex;
  width: 30px;
  height: 20px;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 5;
  @media (min-width: 501px) {
    display: none;
  }
  &:before {
    position: absolute;
    content: '';

    ${(props) =>
      props.isOpen
        ? 'transform:rotate(45deg);background-color:white;'
        : 'top:0px;background-color:black;'}
    left: 0;
    height: 3px;
    width: 100%;
  }
  &:after {
    position: absolute;
    content: '';
    ${(props) =>
      props.isOpen
        ? 'transform:rotate(-45deg);bottom:50%;background-color:white;'
        : 'bottom:0px;background-color:black;'}
    left: 0;
    height: 3px;
    width: 100%;
  }
  span {
    opacity: ${(props) => (props.isOpen ? '0' : '1')};
    display: block;
    background-color: black;
    width: 100%;
    height: 3px;
  }
`;

const Burger = () => {
  const { menuState, toggleMenu } = useMenu();
  return (
    <BurgerStyles onClick={toggleMenu} isOpen={menuState}>
      <span />
    </BurgerStyles>
  );
};

export default Burger;
