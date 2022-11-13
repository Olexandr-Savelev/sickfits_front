import styled from 'styled-components';

const ProductButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: inherit;
  font-weight: 400;
  line-height: 100%;
  cursor: pointer;
  &:not(:first-child) {
    border-left: 1px solid var(--lightGrey);
  }
  &:not(:last-child) {
    border-right: 1px solid var(--lightGrey);
  }
`;

export default ProductButton;
