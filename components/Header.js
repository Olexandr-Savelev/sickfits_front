import Link from 'next/link';
import styled from 'styled-components';
import Burger from './Burger';
import Cart from './Cart';
import MobileCart from './MobileCart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  width: max-content;
  margin: 0 auto;
  background-color: red;
  font-size: 2rem;
  padding: 0.5rem;
  margin: 0.7rem 1.5rem;
  transform: skew(-7deg);
  position: relative;
  z-index: 2;
  a {
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    cursor: pointer;

    @media (min-width: 700px) {
      &:hover {
        outline: none;
        text-decoration: none;
        &:after {
          width: calc(100% - 60px);
        }
        width: calc(100% - 10px);
      }
      &:after {
        height: 2px;
        bottom: 10px;
        background: white;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
    }
  }
  @media (max-width: 700px) {
    font-size: 1.2rem;
    margin: 0.5rem;
  }
`;

const HeaderStyled = styled.header`
  .bar {
    border-bottom: 5px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: center;
    align-items: center;
  }
  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

const MobileNav = styled.div`
  display: none;
  margin-left: auto;
  margin-right: 10px;
  @media (max-width: 501px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <div className="bar">
        <Logo>
          <Link href="/">Sick fits!</Link>
        </Logo>
        <Nav />
        <MobileNav>
          <MobileCart />
          <Burger />
        </MobileNav>
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyled>
  );
}
