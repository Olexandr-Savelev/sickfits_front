import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  height: 100%;
  @media (max-width: 500px) {
    display: none;
  }
  a,
  button {
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    text-align: center;
    @media (max-width: 1200px) {
      font-size: 15px;
    }
    @media (max-width: 900px) {
      font-size: 14px;
      padding: 1rem 15px;
    }
    @media (max-width: 700px) {
      font-size: 12px;
      padding: 1rem 15px;
    }
    &:before {
      content: '';
      width: 2px;
      background-color: var(--lightGrey);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }
    @media (min-width: 700px) {
      &:after {
        height: 2px;
        background: red;
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
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid var(--lightGray);
    width: auto;
    justify-content: center;
    font-size: 1.3rem;
  }
`;

export default NavStyles;
