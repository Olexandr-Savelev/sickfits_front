import styled from 'styled-components';

const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};
  @media (max-width: 500px) {
    min-width: 100vw;
  }
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    button {
      cursor: pointer;
      border: none;
      background: none;
      font-size: 3rem;
      float: right;
      line-height: 100%;
    }
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 1rem;
    padding-top: 1rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 900;
    h3,
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export default CartStyles;
